import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import VueChatScroll from 'vue-chat-scroll';
import Vue2TouchEvents from 'vue2-touch-events';
Vue.use(Vue2TouchEvents);
Vue.use(VueChatScroll);
Vue.config.productionTip = false;
Vue.use(VueMaterial);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
