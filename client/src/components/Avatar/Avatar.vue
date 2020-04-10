<template>
  <v-avatar
    :size="size"
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
    src: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 48
    }
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
