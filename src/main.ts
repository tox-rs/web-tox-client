import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);
Vue.config.productionTip = false;
Vue.use(VueMaterial);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
