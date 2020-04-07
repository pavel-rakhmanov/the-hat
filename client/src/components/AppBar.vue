<template>
  <v-app-bar app>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <UserMenu />
  </v-app-bar>
</template>

<script>
import { PAGE_NAMES_TRANSLATIONS } from '@/router';
import UserMenu from '@/components/UserMenu.vue';

export default {
  name: 'app-bar',
  components: {
    UserMenu,
  },
  computed: {
    title() {
      return `🎩 ${PAGE_NAMES_TRANSLATIONS[this.$route.name]}`;
    },
  },
};
</script>
