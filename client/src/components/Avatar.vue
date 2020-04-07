<template>
  <v-avatar
    size="48"
    class="primary"
    style="border: 2px solid;"
  >
    <img :src="imgUrl">
  </v-avatar>
</template>

<script>
export default {
  name: 'avatar',
  computed: {
    imgUrl() {
      return 'https://cdn.vuetifyjs.com/images/john.jpg';
    },
  },
};
</script>
