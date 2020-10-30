<template>
  <q-item
    clickable
    v-ripple
    :class="[task.done ? 'bg-orange-1' : 'bg-transparent']"
    @click="updateTask({ id: index, updates: { done: !task.done } })"
  >
    <q-item-section avatar>
      <q-checkbox
        :value="task.done"
        @input="updateTask({ id: index, updates: { done: !task.done } })"
        val="index"
        color="orange"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="[task.done ? 'text-strike text-dark' : '']">{{
        task.title
      }}</q-item-label>
    </q-item-section>
    <q-item-section v-if="task.done" side clickable v-ripple>
      <q-btn
        @click.stop="promtForDelete(index)"
        dense
        unelevated
        round
        color="orange"
        icon="delete"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "task",
  props: ["task", "index"],
  methods: {
    ...mapActions("task_store", ["deleteTask", "updateTask"]),
    promtForDelete(index) {
      this.$q
        .dialog({
          title: "Confirm",
          message: `Really want to delete?`,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(index);
          this.$q.notify({
            type: "positive",
            message: `Task Deleted Successfullly`
          });
        })
        .onCancel(() => {
          this.$q.notify({
            type: "negative",
            message: `Task Deletion Cancelled.`
          });
        });
    }
  }
};
</script>
