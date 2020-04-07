<template>
  <div>
    <button @click.stop="clickButton">Тык</button>
    <router-view />
  </div>
</template>

<script lang="js">
export default {
  name: 'app',
  sockets: {
    connect() {
      console.log('socket connected');
    },
    customEmit(data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
    },
  },
  methods: {
    clickButton() {
      this.$socket.emit('test', new Date().toISOString());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
