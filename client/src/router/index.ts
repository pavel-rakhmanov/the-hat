import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export enum PAGE_NAMES {
  Main = 'main',
  Rooms = 'rooms',
  Room = 'room'
}

export const PAGE_NAMES_TRANSLATIONS: {[key in PAGE_NAMES]: string} = {
  [PAGE_NAMES.Main]: '',
  [PAGE_NAMES.Rooms]: 'Rooms',
  [PAGE_NAMES.Room]: 'Room',
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: PAGE_NAMES.Main,
    redirect: {
      name: PAGE_NAMES.Rooms,
    },
  },
  {
    path: `/${PAGE_NAMES.Rooms}`,
    name: PAGE_NAMES.Rooms,
    component: () => import('@/views/Rooms.vue'),
  },
  {
    path: `/${PAGE_NAMES.Rooms}/:roomId`,
    name: PAGE_NAMES.Room,
    props: true,
    component: () => import('@/views/Room.vue'),
  },
  {
    path: '*',
    redirect: {
      name: PAGE_NAMES.Main,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
