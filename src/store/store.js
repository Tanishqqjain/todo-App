import Vue from 'vue'

const state = {
  newTask: "Hiiii",
  task_list: {
    Id1 : {
      title: "Title 1",
      done: false
    },
    Id2 : {
      title: "Title 2",
      done: false
    },
  },
}

const getters = {
  task_list: (state) => state.task_list,
  newTask: (state) => state.newTask
}

const mutations = {
  deleteTask(state, index){
    Vue.delete(state.task_list, index)
  },
  updateTask(state, payload){
    state.task_list[payload.id].done = payload.updates.done
  }
}

const actions = {
  deleteTask({ commit }, index) {
    commit('deleteTask', index)
  },
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  }
}

export default {
  namespaced: true,
  state, 
  getters,
  mutations,
  actions
}
