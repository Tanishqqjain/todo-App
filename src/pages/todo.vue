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
    <div>
      <q-list
        class="q-ma-sm"
        separator
        :class="[this.$q.dark.isActive ? 'bg-dark' : 'bg-white']"
      >
        <task
          v-for="(task, index) in task_list"
          :key="index"
          :task="task"
          :index="index"
        ></task>
      </q-list>
    </div>
    <noTask v-if="!Object.keys(task_list).length" />
  </q-page>
</template>

<script>
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
    noTask: require("components/Task/noTask").default
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
