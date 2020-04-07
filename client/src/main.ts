import Vue from 'vue';

import App from './App.vue';
import router from './router';
import './plugins/socket.io';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  // @ts-ignore
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
