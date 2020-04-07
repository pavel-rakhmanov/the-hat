import Vue from 'vue';
// @ts-ignore
import VueSocketIO from 'vue-socket.io';
// @ts-ignore
import SocketIO from 'socket.io-client';

const API_URL = process.env.VUE_APP_API_URL;

if (!API_URL) {
  throw new Error('.env does nоt contain API_URL url');
}

// https://github.com/MetinSeylan/Vue-Socket.io
Vue.use(new VueSocketIO({
  debug: true,
  connection: API_URL,
  // vuex: {
  //     store,
  //     actionPrefix: 'SOCKET_',
  //     mutationPrefix: 'SOCKET_'
  // },
  // options: {

  // } //Optional options
}));
