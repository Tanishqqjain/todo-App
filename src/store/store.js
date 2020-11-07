import { firebase } from 'boot/firebase'
import Vue from 'vue'
import { uid } from 'quasar'
import { date } from 'quasar'

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
    let databaseref =  firebase.firestore().collection('users').doc(state.user.email)
    databaseref.update({
        [`task_list.${index}`]: firebase.firestore.FieldValue.delete()
    })
    Vue.delete(state.task_list, index)
  },
  updateTask(state, payload){
    let databaseref =  firebase.firestore().collection('users').doc(state.user.email)
    databaseref.update({
        [`task_list.${payload.id}.done`]: payload.updates.done
    })
    state.task_list[payload.id].done = payload.updates.done
  },
  addTask(state, payload){
    let databaseref =  firebase.firestore().collection('users').doc(state.user.email)
    databaseref.update({
        [`task_list.${payload.index}`]: payload.newTask
    })
    Vue.set(state.task_list, payload.index, payload.newTask)
  },
  setUserDetailAndData(state, payload){
    state.user = payload[0]
    state.task_list = payload[1]
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
    let index = Date.now()
    // let index = uid()
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
        let userDetail = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          loggedIn: true
        }
        firebase.firestore().collection("users").doc(userDetail.email)
        .onSnapshot(
          function(doc) {
            let userData = doc.data().task_list
            function sortObj(userData) {
              return Object.keys(userData).sort().reduce(function (result, key) {
                result[key] = userData[key];
                return result;
              }, {});
            }
            userData = sortObj(userData);
            let payload = [userDetail, userData]
            commit('setUserDetailAndData', payload)
          }
        );
        this.$router.push('/')
      }else{
        let userDetail = {
          name: '',
          email: '',
          photoURL: '',
          loggedIn: false,
        }
        let payload = [userDetail, {}]
        commit('setUserDetailAndData', payload)
        this.$router.push('/auth')
        console.log()
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
