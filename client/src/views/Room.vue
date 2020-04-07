<template>
  <div class="Room">
    Room {{ roomId }} page
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
};
</script>
