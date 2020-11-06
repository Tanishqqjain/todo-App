<template>
  <q-page class="column bg-grey-2 q-pa-xs">
    <div
      class="q-ma-sm"
      :class="[this.$q.dark.isActive ? 'bg-grey-4' : 'bg-transparent']"
    >
      <q-input
        v-model="newTask"
        v-on:keyup.enter="verifyAndAdd"
        color="dark"
        outlined
        square
        placeholder="New Task"
        dense
      >
        <template v-slot:append>
          <q-btn @click="verifyAndAdd" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <div class="column">
      <scrollbar style="height:calc(100vh - 260px);">
        <q-list
          class="q-ma-sm"
          separator
          :class="[this.$q.dark.isActive ? 'bg-dark' : 'bg-white']"
        >
          <transition-group
            name="custom-classes-transition"
            duration-enter="500"
            duration-leave="20"
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
            class="q-list q-list--separator"
          >
            <task
              v-for="(task, index) in task_list"
              :key="index + task"
              :task="task"
              :index="index"
            ></task>
          </transition-group>
        </q-list>
      </scrollbar>
    </div>
    <noTask v-if="!Object.keys(task_list).length" />
  </q-page>
</template>

<style lang="scss">
.border {
  border: 1px solid black;
}
</style>
<script>
import scrollbar from "components/scrollbar";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newTask: ""
    };
  },
  computed: {
    ...mapGetters({
      task_list: "task_store/task_list"
    })
  },
  components: {
    task: require("components/Task/task").default,
    noTask: require("components/Task/noTask").default,
    scrollbar
  },
  methods: {
    ...mapActions("task_store", ["addTask"]),
    verifyAndAdd() {
      if (this.newTask.trim()) {
        this.addTask({ title: this.newTask.trim(), done: false });
        this.newTask = "";
      }
    }
  }
};
</script>
