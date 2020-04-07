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
       <Avatar :src="user.avatar" />
      </a>
    </template>
    <v-list>
      <v-list-item class="flex align-center">
        <v-text-field
          dence
          :value="user.userName"
          @change="changeUserName"
          :hide-details="true"
          class="ma-0 ml-2 pa-0"
          label="name"
        />
      </v-list-item>
      <v-list-item>
        <v-file-input
          prepend-icon="portrait"
          accept="image/*"
          label="avatar"
          @change="changeAvatar"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Avatar from './Avatar.vue';

import { User } from '../../../types';
import { SocketEmits, RestEndpoints } from '../../../enums';

export default {
  name: 'user-menu',
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
      isMenuOpen: false,
    };
  },
  methods: {
    changeAvatar(photo) {
      const req = new XMLHttpRequest();
      const formData = new FormData();

      formData.append('photo', photo);
      formData.append('userId', this.$socket.id);

      req.open('POST', `${process.env.VUE_APP_API_URL}/${RestEndpoints.UploadImage}`);
      req.send(formData);

      this.isMenuOpen = false;
    },
    changeUserName(name) {
      name.trim();

      if (name) {
        this.name = name;
      }
    },
  }
};
</script>
