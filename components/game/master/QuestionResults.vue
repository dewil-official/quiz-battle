<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card class="pa-8" elevation="12">
        <v-col>
          <h2>The Results</h2>
          <v-subheader>The admin will reveal the answers one by one.</v-subheader>
          <PlayerRevealList
            :players="gameData.players"
            :gameInfo="gameData.gameInfo"
            isMaster
            @onReveal="updateReveals"
          />
          <v-divider class="mx-3 mb-6" />
          <GameControlBar :gameInfo="gameData.gameInfo" :isContinueGrey="isContinueGrey" />
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PlayerRevealList from '../shared/PlayerRevealList.vue'
import { GameData } from '~/types/interfaces/game/gameUpdate'
import RevealedAnswers from '~/types/interfaces/master/revealedAnswers'
import GameControlBar from '~/components/game/master/utils/GameControlBar.vue'

@Component({
  components: {
    PlayerRevealList,
    GameControlBar,
  },
})
export default class QuestionResults extends Vue {
  @Prop({ default: null }) gameData!: GameData | null

  reveals: RevealedAnswers = []

  get isContinueGrey() {
    // Returns true only if all players have been revealed.
    // If not all have been revealed, open a confirm-dialog
    // On confirm, automatically reveal all people first,
    // which will NOT continue, only reveal the continue button
    if (this.reveals.length < 1) return true
    else {
      // FIXME: Somehow this doesn't work as intended (.every and forEach didn't work)
      let hiddenPlayer = this.reveals.indexOf(false)
      if (hiddenPlayer === undefined) return false
      return true
    }
  }

  updateReveals(reveals: RevealedAnswers) {
    this.reveals = reveals
  }
}
</script>
