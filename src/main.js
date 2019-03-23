import Vue from 'vue'
import * as firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import './style.scss'
import router from './router.js'
import store from './store'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    var config = {
      apiKey: "secret",
      authDomain: "secret",
      databaseURL: "secret",
      projectId: "secret",
      storageBucket: "secret",
    };
    firebase.initializeApp(config);

    this.$store.dispatch('setPosts');
  }
})
