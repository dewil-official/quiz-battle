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
          <GameControlBar :gameInfo="gameData.gameInfo" :allowContinue="allowContinue" />
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PlayerRevealList from '../shared/PlayerRevealList.vue'
import { GameData } from '~/types/interfaces/game/gameUpdate'
import RevealedAnswers, {
  AnswerReveal,
} from '~/types/interfaces/master/revealedAnswers'
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

  get allowContinue() {
    if (this.reveals.length > 0) {
      let isAllRevealed = true
      this.reveals.forEach((player: AnswerReveal) => {
        !player.isRevealed ? (isAllRevealed = false) : null
      })
      return isAllRevealed
    }
    return false
  }

  updateReveals(reveals: RevealedAnswers) {
    this.reveals = reveals
  }
}
</script>
