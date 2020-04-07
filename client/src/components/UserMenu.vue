<template>
  <v-menu
    v-model="isMenuOpen"
    left bottom
    :nudge-bottom="65"
    :min-width="200"
    :max-width="200"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <a v-on="on">
       <Avatar />
      </a>
    </template>
    <v-list>
      <v-list-item class="flex align-center">
        name:
        <v-text-field
          dence
          :value="userName"
          @change="changeUserName"
          :hide-details="true"
          class="ma-0 ml-2 pa-0"
        />
      </v-list-item>
      <v-list-item @click.stop="changeIcon">
        change img: <v-icon>publish</v-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  name: 'user-menu',
  components: {
    Avatar,
  },
  data() {
    return {
      userName: '',
      isMenuOpen: false,
    };
  },
  methods: {
    changeIcon() {
      this.isMenuOpen = false;
    },
    changeUserName(name) {
      name.trim();

      if (name) {
        this.name = name;
      }
    },
  },
};
</script>
