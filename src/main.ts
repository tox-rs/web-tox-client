import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import {
  MdButton,
  MdContent,
  MdTabs,
  MdField,
  MdDialog,
  MdIcon,
  MdAvatar,
  MdBadge,
  MdList,
  MdSnackbar,
  MdMenu,
  MdAutocomplete,
  MdCheckbox,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import VueChatScroll from 'vue-chat-scroll';
import Vue2TouchEvents from 'vue2-touch-events';
import VueNativeNotification from 'vue-native-notification';
Vue.use(VueNativeNotification, {
  // Automatic permission request before
  // showing notification (default: true)
  requestOnNotify: true,
});
Vue.use(Vue2TouchEvents);
Vue.use(VueChatScroll);
Vue.config.productionTip = false;
Vue.use(MdButton);
Vue.use(MdCheckbox);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdIcon);
Vue.use(MdDialog);
Vue.use(MdAvatar);
Vue.use(MdBadge);
Vue.use(MdField);
Vue.use(MdSnackbar);
Vue.use(MdList);
Vue.use(MdMenu);
Vue.use(MdAutocomplete);
declare module 'vue/types/vue' {
  interface VueConstructor {
    notification: any;
  }
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
