<template>
  <v-avatar
    size="48"
    class="secondary"
    style="border: 2px solid;"
  >
    <img
      v-if="src"
      :src="imgUrl"
    >
  </v-avatar>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    src: String,
  },
  computed: {
    imgUrl() {
      const { src } = this;

      if (!src) return '';

      if (src.includes('http')) {
        return src;
      }

      return `${process.env.VUE_APP_API_URL}/${this.src}`;
    },
  },
};
</script>
