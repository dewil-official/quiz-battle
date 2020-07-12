<template>
  <div>
    <MasterView />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MasterView from '~/components/pages/game/MasterView.vue'
import PlayerView from '~/components/pages/game/PlayerView.vue'

@Component({
  components: {
    MasterView,
    PlayerView,
  },
})
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
