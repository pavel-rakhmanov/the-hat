<template>
  <div class="flex flex-column">
    <div class="mb-3 d-flex align-center">
      <v-text-field
        v-model="search"
        clearable
        flat solo
        hide-details
        prepend-inner-icon="search"
        label="Search"
      />
      <v-btn
        color="primary"
        class="ml-3"
        icon
        @click.stop="addRoom"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>

    <div class="flex flex-column">
      <v-card
        v-ripple
        v-for="(room, roomIndex) in filteredRooms"
        :key="`room-${roomIndex}`"
        :elevation="5"
        :disabled="room.users.length === room.usersLimit"
        @click.stop="() => { goToRoom(room) }"
        :class="{ 'mb-3': roomIndex < rooms.length - 1 }"
      >
        <v-card-title>
          <span class="primary--text">
            {{ room.name }}
          </span>
          <v-spacer/>
          <span class="secondary--text">
            {{ room.users.length }}/{{ room.usersLimit }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex">
            <User 
              v-for="(user, userIndex) in room.users"
              :key="`room-${roomIndex}-user-${userIndex}`"
              :user="user"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Room } from '../../../types';
import { SocketEmits } from '../../../enums';

import { PAGE_NAMES } from '../router';
import { User } from '../components';

export default {
  name: 'rooms',
  components: {
    User,
  },
  sockets: {
    [SocketEmits.Rooms](rooms: Room[]) {
      // @ts-ignore
      this.rooms = rooms
        // .filter(room => room.usersLimit - room.users.length > 0)
        .sort(
          (a, b) => (a.usersLimit - a.users.length) - (b.usersLimit - b.users.length)
        );
    },
  },
  data() {
    return {
      rooms: [],
      search: '',
    };
  },
  computed: {
    filteredRooms() {
      const searchString = this.search.trim().toLowerCase();

      if (!searchString) return this.rooms;

      return this.rooms.filter(room => [
          room.id, room.name, ...room.users.map(user => user.name)
        ].some(fieldForSearch => fieldForSearch.toLowerCase().includes(searchString))
      )
    }
  },
  methods: {
    addRoom() {
      // TODO: создание комнаты пользователем а не мок
      const room: Room = {
        id: this.rooms.length.toString(),
        users: [],
        usersLimit: 4,
      };

      this.$socket.emit(SocketEmits.AddRoom, room);
    },
    goToRoom(room: Room) {
      setTimeout(() => {
        this.$router.push({
          name: PAGE_NAMES.Room,
          params: {
            roomId: room.id,
          },
        });
      }, 150)
    },
  },
  created() {
    this.$socket.emit(SocketEmits.Rooms);
  }
};
</script>
