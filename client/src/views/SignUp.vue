<template>
  <v-row justify="center" style="height: 100%;">
    <v-col :sm="10" :md="6" :lg="4" align="center" align-self="center">
      <v-card>
        <v-card-title>
          Hi
        </v-card-title>

        <v-card-text>
          <Avatar
            :src="avatar"
            :size="150"
            class="mb-3"
          />
          <v-text-field
            v-model="name"
            :error-messages="error"
            dence
            label="name"
            class="mb-3"
          />
          <v-btn
            block
            class="primary mb-3"
            @click="randomUser"
          >
            <v-icon>casino</v-icon>
          </v-btn>
          <v-btn
            block
            class="secondary mb-3"
            :loading="isLoading"
            @click="signUp"
          >
            Sign up
          </v-btn>
          <p class="caption">
            This person does not really exist
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from '@vue/composition-api';

import router, { PAGE_NAMES } from '../router';
import { API } from '../api';
import { Avatar } from '../components';
import { UserStore } from '../store'
import { envVariableGetter } from '../utils';

export default defineComponent({
  name: PAGE_NAMES.SignUp,
  components: {
    Avatar,
  },
  setup: (props, context) => {
    const isLoading = ref(false);
    const error = ref('');
    const name = ref('');
    const avatar = ref('');

    onMounted(() => { randomUser(); });

    watch(error, () => {
      setTimeout(() => {
        error.value = '';
      }, 1000 * 5);
    })

    const randomUser = async () => {
      if (isLoading.value) return;

      try {
        isLoading.value = true;

        const randomUser = await API.randomUser();

        name.value = randomUser.name;
        avatar.value = randomUser.avatar;
      } catch (e) {
        error.value = JSON.stringify(e);
      } finally {
        isLoading.value = false;
      }
    }

    const signUp = async () => {
      if (isLoading.value) return;

      try {
        isLoading.value = true;

        const response = await API.signUp({
          id: new Date().getTime().toString(),
          name: name.value,
          avatar: avatar.value
        });

        UserStore.Login({ id: response.data.id })
      } catch (e) {
        error.value = JSON.stringify(e.message);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      error,
      name,
      avatar,
      randomUser,
      signUp,
    }
  },
});
</script>
