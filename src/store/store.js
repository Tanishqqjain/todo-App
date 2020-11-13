import { firebase } from 'boot/firebase'
import Vue from 'vue'
import { Notify } from 'quasar'

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
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password1).catch(function(error){
      var errorCode = error.code.split('auth/')[1].split("-").join(" ");
      errorCode = errorCode.charAt(0).toUpperCase() + errorCode.substring(1);
      Notify.create({
        type: "negative",
        message: errorCode
      });
    })
  },
  loginUser({}, payload){
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password1).catch(function(error) {
      var errorCode = error.code.split('auth/')[1].split("-").join(" ");
      errorCode = errorCode.charAt(0).toUpperCase() + errorCode.substring(1);
      Notify.create({
        type: "negative",
        message: errorCode
      });
    });
  },
  signInwithGoogle({ commit }){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var docRef = firebase.firestore().collection("users").doc(result.user.email);
      docRef.get().then(function(doc) {
          if (!doc.exists) {
              docRef.set({task_list:[]})
              // console.log("SignUp Successful.")
            } else {
              // console.log("SignIn Successful..")
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
      if (user && user.emailVerified) {
        let userDetail = {
          name: user.displayName || user.email.split("@")[0],
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
      }else if(user && !user.emailVerified){
        Notify.create({
          type: "negative",
          message: `Please verify mail first`
        });
        // var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          firebase.auth().signOut().then(function() {
            console.log("signoout successful", user.email)
            var docRef = firebase.firestore().collection("users").doc(user.email);
            docRef.get().then(function(doc) {
            if (!doc.exists) {
              docRef.set({task_list:[]})
            }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
          }).catch(function(error) {
            console.log("SiginOut Error", error)
          });
        }).catch(function(error) {
          console.log("error occured" , error)
        });
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
      }
    });
  },
  logout({}){
    firebase.auth().signOut().then(function() {
      console.log("SignOut Successful.")
    }).catch(function(error) {
      console.log("Error occured during logout.", e)
    });
  },
  sendPasswordResetEmail({}, email){
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      Notify.create({
        type: "positive",
        message: "Password Reset link Sent Successfully"
      });
    }).catch(function(error) {
      var errorCode = error.code.split('auth/')[1].split("-").join(" ");
      errorCode = errorCode.charAt(0).toUpperCase() + errorCode.substring(1);
      Notify.create({
        type: "negative",
        message: errorCode
      });
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
