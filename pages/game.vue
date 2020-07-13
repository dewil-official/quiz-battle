<template>
  <div>
    <MasterView v-if="hasGameData" :gameData="gameState.gameData" />
    <LoadingPage v-if="!hasGameData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'
import MasterView from '~/components/pages/game/MasterView.vue'
import PlayerView from '~/components/pages/game/PlayerView.vue'
import LoadingPage from '~/components/shared/LoadingPage.vue'
import { GameData } from '../types/interfaces/game/gameUpdate'
import AuthStore from '../store/auth'
import AuthState from '../types/interfaces/auth/authState'
import GameState from '../types/interfaces/game/gameState'

@Component({
  components: {
    MasterView,
    PlayerView,
    LoadingPage,
  },
})
export default class GamePage extends Vue {
  @State('game') gameState!: GameState
  @State('auth') authState!: AuthState

  get gameData(): GameData | null {
    return this.gameState.gameData
  }

  get hasGameData(): boolean {
    if (this.isGameData(this.gameData) && this.gameData) {
      return true
    } else {
      return false
    }
  }

  isGameData(object: any): object is GameData {
    return object
  }

  mounted() {
    if (this.authState.token) {
      this.$socket.client.emit('get_game_update', this.authState.token)
    } else {
      this.$router.push('/')
    }
  }
}
</script>
