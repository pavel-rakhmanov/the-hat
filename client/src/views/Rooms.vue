<template>
  <v-container fluid>
    <v-data-iterator
      :items="rooms"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :hide-default-footer="true"
    >
      <template v-slot:no-data>
        no data
      </template>
      <template v-slot:no-results>
        no results
      </template>
      <template v-slot:header>
          <v-toolbar class="mb-3">
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
              text icon
              @click.stop="addRoom"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn
              class="ml-3"
              text icon
              @click.stop="prevPage"
            >
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <span class="body ml-3">
              {{ paginationText }}
            </span>
            <v-btn
              class="ml-3"
              text icon
              @click.stop="nextPage"
            >
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-toolbar>
      </template>
      <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="(room, roomIndex) in props.items"
              :key="roomIndex"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                :disabled="room.users.length === room.usersLimit"
                @click.stop="() => { goToRoom(room) }"
                style="height: 100%"
              >
                <v-card-title class="primary--text">
                  {{ room.name }}
                </v-card-title>
                <v-card-text>
                  {{ JSON.stringify(room, null, 2 )}}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script lang="ts">
import { PAGE_NAMES } from '@/router';

import { Room } from '../../../types';
import { SocketEmits } from '../../../enums';

export default {
  name: 'rooms',
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
      itemsPerPage: 4,
      page: 1,
      search: '',
    };
  },
  computed: {
    paginationText() {
      const total = this.rooms.length;
      const from = total ? ((this.page - 1) * this.itemsPerPage) + 1 : 0;
      const to = this.page * this.itemsPerPage;

      return `${from} - ${Math.min(to, total)} / ${this.rooms.length}`;
    }
  },
  methods: {
    nextPage() {
      if (this.page * this.itemsPerPage < this.rooms.length) {
        this.page += 1;
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page -= 1;
      }
    },
    addRoom() {
      const room = {
        id: this.rooms.length.toString(),
        users: [],
        teams: [],
        timePerRound: 6000,
        usersLimit: 4,
        words: [],
      };
      this.$socket.emit(SocketEmits.AddRoom, room);
    },
    goToRoom(room: Room) {
      this.$router.push({
        name: PAGE_NAMES.Room,
        params: {
          roomId: room.id,
        },
      });
    },
  },
  created() {
    this.$socket.emit(SocketEmits.Rooms);
  }
};
</script>
