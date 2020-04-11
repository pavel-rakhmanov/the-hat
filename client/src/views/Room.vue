<template>
  <div class="Room">
    Room {{ roomId }} page

    <pre>{{ JSON.stringify(room, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
import { Room, BaseUser } from '../../../types';
import { SocketEmits } from '../../../enums';

import { API } from '../api'
import { UserStore } from '../store';

export default {
  name: 'room',
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      room: null,
    };
  },
  computed: {
    user () {
      return UserStore.user;
    },
  },
  methods: {
    leaveRoom: async function() {
      await API.leaveRoom({
        roomId: this.roomId,
        userId: this.user.id
      })
    },
  },
  beforeDestroy: async function () {
    await this.leaveRoom();
  },
};
</script>
