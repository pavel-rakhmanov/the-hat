import Vue from 'vue';

import              './plugins/socket.io';
import              './plugins/composition-api';
import vuetify from './plugins/vuetify';
import              './styles/index.scss';

import App from './App.vue';
import router from './router';
import store, { UserStore } from './store';

UserStore.tryToRestoreUser();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
