<template>
  <v-app>
    <AppBar />
    <v-content>
      <v-container fluid style="height: 100%;">
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
  },
};
</script>
