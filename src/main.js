import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import axios from 'axios';
import VueAxios from 'vue-axios';
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

// axios.defaults.baseURL = 'http://localhost:5000/api';

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
