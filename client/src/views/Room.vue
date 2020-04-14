<template>
  <div class="room-view d-flex">
    <template v-if="!room">
      <Loader />
    </template>

    <template v-else>
      <v-row>
        <v-col
          class="pt-0"
          :sm="12" :md="6"
        >
          <Room
            :room="{...room, users: [] }"
            class="mb-6"
          />

          <div class="mb-6 pa-3 pb-0 shadow">
            <p class="ma-0 mb-3">
              Ready users:
            </p>
            <div class="d-flex flex-wrap" >
              <User
                v-for="(user, userIndex) in room.users.filter(user => room.readyUsersIds.includes(user.id))"
                :key="`user-ready-${userIndex}`"
                :user="user"
                class="mb-3 mr-3"
              />
            </div>
          </div>

          <div class="mb-3 pa-3 pb-0 shadow">
            <p class="ma-0 mb-3">
              Not ready users:
            </p>
            <div class="d-flex flex-wrap" >
              <User
                v-for="(user, userIndex) in room.users.filter(user => !room.readyUsersIds.includes(user.id))"
                :key="`user-not-ready-${userIndex}`"
                :user="user"
                class="mb-3 mr-3"
              />
            </div>
          </div>
        </v-col>
        <v-col
          class="pt-0"
          :sm="12" :md="6"
        >
          <WordsList
            class="mb-6"
            :words="words"
          />

          <v-btn
            class="block primary"
            @click="toggleReady"
            :disabled="!isEnoughWords"
          >
            {{ isUserReady ? "Not ready yet" : "I'm ready" }}
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
import { Room, WordsList, Loader, User } from '@/components';
import { UserStore } from '@/store';

export default {
  name: 'room-view',
  components: {
    Room,
    WordsList,
    Loader,
    User
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
