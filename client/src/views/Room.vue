<template>
  <div class="Room">
    Room {{ roomId }} page

    <pre>{{ JSON.stringify(room, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
import { Room, BaseUser } from '../../../types';
import { SocketEmits } from '../../../enums';

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
  created() {
    this.$socket.emit(SocketEmits.EnterRoom, this.roomId);
  },
  beforeDestroy() {
    this.$socket.emit(SocketEmits.LeaveRoom, this.roomId);
  },
};
</script>
