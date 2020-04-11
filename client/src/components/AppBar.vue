<template>
  <v-app-bar app>
    <v-toolbar-title >
      <div
        @click="goToMain"
        style="cursor: pointer;"
      >
        <img :src="logoSrc" class="mr3">
        {{ title }}
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <template v-if="user">
      <User :user="user" />
      <v-btn icon text @click="logOut" class="ml-3">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { SocketEmits, RestEndpoints } from '../../../enums';

import { PAGE_NAMES, PAGE_NAMES_TRANSLATIONS } from '../router';
import { UserStore } from '../store'

import User from '../components/User';
import { envVariableGetter } from '../utils';

export default {
  name: 'app-bar',
  components: {
    User,
  },
  computed: {
    logoSrc() {
      return `${envVariableGetter('VUE_APP_PUBLIC_FILES')}/img/hat.png`;
    },
    user() {
      return UserStore.user || undefined
    },
    title() {
      return `${PAGE_NAMES_TRANSLATIONS[this.$route.name]}`;
    },
  },
  methods: {
    logOut() {
      UserStore.LogOut();
    },
    goToMain() {
      this.$router.push({ name: PAGE_NAMES.Main });
    },
  },
};
</script>
