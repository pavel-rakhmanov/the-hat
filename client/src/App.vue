<template>
  <v-app>
    <AppBar />
    <v-content>
      <v-container fluid style="height: 100%;" class="container">
        <router-view />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { SocketEmits } from '../../enums';
import { BaseUser } from '../../types';

import { UserStore } from './store';
import { AppBar, Footer } from './components';

export default {
  name: 'app',
  components: {
    AppBar,
    Footer,
  },
  computed: {
    user() {
      return UserStore.user
    }
  },
  watch: {
    user(newUser) {
      const userId = newUser?.id;
      userId && this.$socket.emit(SocketEmits.BindUserId, userId);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px calc(50% - 40vw);
}
</style>
