<template>
  <div>
    <div v-if></div>
    <p>Welcome to the game!</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class GamePage extends Vue {
  get authState() {
    return this.$store.state.auth
  }

  mounted() {
    if (this.authState.token) {
      this.$socket.client.emit('get_game_state', this.authState.token)
    } else {
      this.$router.push('/')
    }
  }
}
</script>
