<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <div v-on="on" style="cursor: pointer; max-width: max-content;">
        <Avatar :src="user.avatar" />
      </div>
    </template>
    <span>{{user.name }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { BaseUser } from '../../../../types';

import Avatar from '../Avatar';

export type UserProps = {
  user: BaseUser
}

export default defineComponent<UserProps>({
  name: 'user',
  components: {
    Avatar,
  },
  props: {
    user: {
      type: Object,
      default: () => {
        const defaultUser: UserProps['user'] = {
          id: 'unknown',
          name: 'unknown',
        }

        return defaultUser
      },
    }
  }
})
</script>