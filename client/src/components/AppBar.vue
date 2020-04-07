<template>
  <v-app-bar app>
    <v-toolbar-title >
      <div
        @click="goToMain"
        style="cursor: pointer;"
      >
        <img src="@/assets/hat.png" class="mr3">
        {{ title }}
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
      <p class="mt-5 mb-1 mr-1">{{ user.name }} </p>
      <Avatar :src="user.avatar"/>
  </v-app-bar>
</template>

<script lang="ts">
import { PAGE_NAMES, PAGE_NAMES_TRANSLATIONS } from '@/router';
import Avatar from '@/components/Avatar.vue';

import { User } from '../../../types';
import { SocketEmits, RestEndpoints } from '../../../enums';

export default {
  name: 'app-bar',
  components: {
    Avatar,
  },
  sockets: {
    [SocketEmits.User](user: User) {
      // @ts-ignore
      this.user = user;
    },
  },
  data() {
    return {
      user: {},
    };
  },
  computed: {
    title() {
      return `${PAGE_NAMES_TRANSLATIONS[this.$route.name]}`;
    },
  },
  methods: {
    goToMain() {
      if (this.$route.name === PAGE_NAMES.Main) return;

      this.$router.push({
        name: PAGE_NAMES.Main,
      });
    },
  },
};
</script>
