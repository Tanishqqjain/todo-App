import { firebaseAuth, firebaseDB } from 'boot/firebase'
import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  task_list: {
    // Id1 : {
    //   title: "Title 1",
    //   done: false
    // },
    // Id2 : {
    //   title: "Title 2",
    //   done: false
    // },
  },
}

console.log({firebaseAuth, firebaseDB})
const getters = {
  task_list: (state) => state.task_list,
}

const mutations = {
  deleteTask(state, index){
    Vue.delete(state.task_list, index)
  },
  updateTask(state, payload){
    state.task_list[payload.id].done = payload.updates.done
  },
  addTask(state, payload){
    Vue.set(state.task_list, payload.index, payload.newTask)
  }
}

const actions = {
  deleteTask({ commit }, index) {
    commit('deleteTask', index)
  },
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  addTask({ commit }, newTask){
    let index = uid()
    let payload = {index, newTask}
    commit('addTask', payload)

  }
}

export default {
  namespaced: true,
  state, 
  getters,
  mutations,
  actions
}
