<template>
  <div class="room-view d-flex">
    <template v-if="!room">
      <Loader />
    </template>

    <template v-else>
      <v-row>
        <v-col :sm="12" :md="6">
          <Room :room="room" />
        </v-col>
        <v-col :sm="12" :md="6">
          <WordsList :words="words" />

          <v-btn
            class="mt-3 block primary"
            @click="toggleReady"
            :disabled="!isEnoughWords"
          >
            {{ isUserReady ? "I'm ready" : "Not ready yet" }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
import { BaseRoom, BaseUser } from '@/types';
import { SocketEmits } from '@/enums';
import { API } from '@/api';
import { Room, WordsList, Loader } from '@/components';
import { UserStore } from '@/store';

export default {
  name: 'room-view',
  components: {
    Room,
    WordsList,
    Loader
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  sockets: {
    [SocketEmits.Room](room: BaseRoom) {
      // @ts-ignore
      this.room = room
    },
  },
  data() {
    return {
      room: null,
      words: ['слово 1', 'слово 2', 'слово 3', 'слово 4', 'слово 5'],
    };
  },
  computed: {
    user () { return UserStore.user; },
    isUserReady () { return (this.room?.readyUsersIds || []).includes(this.user?.id) },
    // TODO: min/max words per game
    isEnoughWords () { return this.words.length > 0}
  },
  methods: {
    leaveRoom: async function() {
      await API.leaveRoom({
        roomId: this.roomId,
        userId: this.user.id
      })
    },
    toggleReady: async function() {
      this.isUserReady
        ? await API.unmarkUserAsReady({
            roomId: this.roomId,
            userId: this.user.id
          })
        : await API.markUserAsReady({
            roomId: this.roomId,
            userId: this.user.id
          })
    }
  },
  created() {
    this.$socket.emit(SocketEmits.Room, this.roomId);
  },
  beforeDestroy: async function () {
    await this.leaveRoom();
  },
};
</script>
