<template>
  <div>
    <div v-if=""></div>
    <p>Welcome to the game!</p>
  </div>
</template>

<script>
export default {
  computed: {
    authState() {
      return this.$store.state.auth
    },
  },
}
</script>
