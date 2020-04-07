<template>
  <v-app>
    <AppBar />

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script lang="js">
import AppBar from './components/AppBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    AppBar,
    Footer,
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    customEmit(data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
    },
  },
  methods: {
    clickButton() {
      this.$socket.emit('test', new Date().toISOString());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
