<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="pa-8" elevation="12">
        <v-col>
          <h1>Waiting for Players...</h1>
          <h5 color="grey--text">Connected:</h5>
          <PlayerList :players="gameState.players" joinMode />
          <v-btn block color="primary">Start Game</v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PlayerInfo from '~/types/game/playerInfo'
import { JokerTypes } from '~/types/game/jokerTypes'
import PlayerList from '../shared/PlayerList.vue'
@Component({
  components: {
    PlayerList,
  },
})
export default class Waiting extends Vue {
  get gameState() {
    return this.$store.state.game
  }
}
</script>
