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
    // console.log(index)
    Vue.delete(state.task_list, index)
  },
  updateTask(state, payload){
    // console.log(payload.id)
    state.task_list[payload.id].done = payload.updates.done
  },
  addTask(state, payload){
    let databaseref =  firebase.firestore().collection('users').doc(state.user.email)
    databaseref.update({
        task_list: firebase.firestore.FieldValue.arrayUnion({index: payload.index, task: payload.newTask} )
    }).then(result => {
      console.log(result)
    })
    Vue.set(state.task_list, payload.index, payload.newTask)
  },
  setUser(state, payload){
    state.user = payload
  },
  setUserData(state, payload){
    state.task_list = payload
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
      var docRef = firebase.firestore().collection("users").doc(result.user.email);
      docRef.get().then(function(doc) {
          if (!doc.exists) {
              docRef.set({task_list:[]})
              console.log("SignUp Successful.")
            } else {
              console.log("SignIn Successful..")
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

    }).catch((e)=>{
      console.log("SignIn Error: ", e)
    })
  },
  userIsSignedInOrNot({ commit, dispatch }){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let payload = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          loggedIn: true
        }
        commit('setUser', payload)
        dispatch('getUserData', payload)
        // this.$router.push('/')
      }else{
        let payload = {
          name: '',
          email: '',
          photoURL: '',
          loggedIn: false
        }
        commit('setUser', payload)
        commit('setUserData', {})
        // this.$router.push('/auth')
        console.log()
      }
    });
  },
  getUserData({ commit }, payload){
    firebase.firestore().collection("users").doc(payload.email)
    .get()
    .then(
      function(doc) {
        let data = {}
        doc.data().task_list.forEach(task => {
          data[task.index] = task.task
        });
        commit('setUserData', data)
      }
    );
    // console.log(payload, "hii")
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
