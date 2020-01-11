<template>
  <div>
    <h1>CHAT PAGE</h1>
    <h2>{{ user.name }}</h2>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "chat",
    layout: "empty",
    middleware: ['chat'],
    head() {
      return {
        title: `Room ${this.user.room}`
      }
    },
    computed: mapState(["user"])
  }
</script>

<style scoped>

</style>
