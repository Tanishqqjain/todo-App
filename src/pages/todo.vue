<template>
  <q-page class="column bg-grey-2 q-pa-xs">
    <!-- <div class="q-pa-md"> -->
      <div class="q-ma-sm" :class="[this.$q.dark.isActive? 'bg-grey-4':'bg-transparent']">
        <q-input 
          v-model="newTask" 
          v-on:keyup.enter="addTask"
          color="dark" 
          outlined 
          square
          placeholder="New Task" 
          dense>
          <template v-slot:append>
            <q-btn 
              @click="addTask"
              round 
              dense 
              flat 
              icon="add" />
          </template>
        </q-input>
      </div>
      <div class="bg-grey-2">
        <q-list
          class="q-ma-sm"
          separator
          :class="[this.$q.dark.isActive? 'bg-dark':'bg-white']">
          <q-item 
            v-for="(task, index) in task_list" 
            :key="index"

            tag="label" 
            clickable 
            v-ripple
            :class="[task.done?'bg-orange-1':'bg-transparent']">
            <q-item-section avatar>
              <q-checkbox v-model="task.done" val="index" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="[task.done?'text-strike text-dark':'']">{{task.title}}</q-item-label>
            </q-item-section>
            <q-item-section 
              v-if="task.done"
              side
              clickable
              v-ripple>
              <q-btn 
                @click.stop="deleteTask(index)"
                dense 
                unelevated 
                round 
                color="orange" 
                icon="delete" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-if="!task_list.length" class="no-task absolute-center" style="opacity:0.5; ">
        <q-icon name="done" style="font-size: 3em;" />
        <p> No task </p>
      </div>
    <!-- </div> -->
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      task_list:[
      ],
    }
  },
  methods: {
    addTask(){
      if(this.newTask.trim()){
        this.task_list.unshift({title: this.newTask.trim(), done: false})
        this.newTask = ''
      }
    },
    deleteTask(index){
      this.$q.dialog({
        title: 'Confirm',
        message: `Really want to delete?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.task_list.splice(index, 1) 
        this.$q.notify({
          type: 'positive',
          message: `Task deleted successfullly`
        })
      }).onCancel(() => {
        this.task_list[index].done = false
        this.$q.notify({
          type: 'negative',
          message: `Task Deletion Cancelled.`
        })
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
      
    }
  },
}
</script>
