import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { UserStore } from '@/store';

Vue.use(VueRouter);

export enum PAGE_NAMES {
  SignUp = 'sign-up',
  Main = 'main',
  Rooms = 'rooms',
  Room = 'room',
  NotFound = 'not-found'
}

export const PAGE_NAMES_TRANSLATIONS: {[key in PAGE_NAMES]: string} = {
  [PAGE_NAMES.SignUp]: 'Sign up',
  [PAGE_NAMES.Main]: '',
  [PAGE_NAMES.Rooms]: 'Rooms',
  [PAGE_NAMES.Room]: 'Room',
  [PAGE_NAMES.NotFound]: '[404]: nonexistent page',
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
    path: `/${PAGE_NAMES.SignUp}`,
    name: PAGE_NAMES.SignUp,
    component: () => import('@/views/SignUp.vue'),
    beforeEnter: (to, from, next) => {
      UserStore.isAuthorized ? next({ name: PAGE_NAMES.Main }) : next();
    }
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
    path: `/${PAGE_NAMES.NotFound}`,
    name: PAGE_NAMES.NotFound,
    component: () => import('@/views/NotFound'),
  },
  {
    path: '*',
    redirect: {
      name: PAGE_NAMES.NotFound,
    },
  },
];

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });
}

const router = createRouter();
export default router;

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
  router.push({ name: PAGE_NAMES.SignUp });
}

router.beforeEach((to, from, next) => {
  const { isAuthorized } = UserStore

  if (!isAuthorized) {
    to.name === PAGE_NAMES.SignUp 
      ? next()
      : next({ name: PAGE_NAMES.SignUp })
  } else {
    next();
  }
});
