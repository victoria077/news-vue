import Vue               from 'vue'
import App               from './App.vue'
import router            from './router'
import vuetify from './plugins/vuetify'
import {initializeApp} from "firebase/app";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDOhBnWOHvckiHwz3D2k27wViWEB-E2II4",
  authDomain: "blog-news-8d44d.firebaseapp.com",
  databaseURL: "https://blog-news-8d44d-default-rtdb.firebaseio.com",
  projectId: "blog-news-8d44d",
  storageBucket: "blog-news-8d44d.appspot.com",
  messagingSenderId: "1068261284199",
  appId: "1:1068261284199:web:d8239a5eab5648ecc0b7c2"
};

const app = initializeApp(firebaseConfig);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
