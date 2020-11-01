// import { firebaseAuth, firebaseDB } from 'boot/firebase'
import { firebase } from 'boot/firebase'
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
  user:{}
}

const getters = {
  task_list: (state) => state.task_list,
  user: (state) => state.user,
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
  },
  setUser(state, payload){
    state.user = payload
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
  },
  registerUser({}, payload){
    
  },
  loginUser({}, payload){
    
  },
  signInwithGoogle({ commit }){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log("SignIn Successful.")
    }).catch((e)=>{
      console.log("SignIn Error: ", e)
    })
  },
  userIsSignedInOrNot({ commit }){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let payload = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          loggedIn: true
        }
        commit('setUser', payload)
      }else{
        let payload = {
          name: '',
          email: '',
          photoURL: '',
          loggedIn: false
        }
        commit('setUser', payload)
      }
    });
  },
  logout({}){
    firebase.auth().signOut().then(function() {
      console.log("SignOut Successful.")
    }).catch(function(error) {
      console.log("Error occured during logout.", e)
    });
  }
}

export default {
  namespaced: true,
  state, 
  getters,
  mutations,
  actions
}
