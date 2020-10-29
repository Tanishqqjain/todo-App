<template>
  <q-page class="column bg-grey-2 q-pa-xs">
    <!-- <div class="q-pa-md"> -->
    <div
      class="q-ma-sm"
      :class="[this.$q.dark.isActive ? 'bg-grey-4' : 'bg-transparent']"
    >
      <q-input
        v-model="newTask"
        v-on:keyup.enter="addTask"
        color="dark"
        outlined
        square
        placeholder="New Task"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
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
    <div
      v-if="!task_list.length"
      class="no-task absolute-center"
      style="opacity:0.5; "
    >
      <q-icon name="done" style="font-size: 3em;" />
      <p>No task</p>
    </div>
    <!-- </div> -->
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      task_list: "task_store/task_list",
      newTask: "task_store/newTask"
    })
  },
  components: {
    task: require("components/Task/task").default
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.task_list.unshift({ title: this.newTask.trim(), done: false });
        this.newTask = "";
      }
    }
  }
};
</script>
