<!-- This component is used to one-by-one reveal the Quiz Answers! -->
<template>
  <v-list two-line>
    <div v-for="(player, playerIndex) in players" :key="player.name">
      <v-list-item ripple>
        <v-list-item-avatar color="primary">
          <span class="white--text headline">{{ getNameAbbreviation(player.name) }}</span>
        </v-list-item-avatar>
        <v-list-item-content
          v-if="isMaster || isRevealed(playerIndex)"
          :style="{ opacity: isMaster && revealedAnswers[playerIndex] ? 1 : 0.33 }"
        >
          <v-list-item-title style="white-space: normal;" v-text="player.answer"></v-list-item-title>
          <v-list-item-subtitle>
            <span class="mr-4">{{ player.name }}</span>
            <span class="mr-4">
              <v-icon x-small>mdi-trophy</v-icon>
              {{ player.score }}
            </span>
            <span>
              <v-icon
                v-if="player.activeJoker == 'x3'"
                color="green"
                x-small
              >mdi-numeric-3-circle-outline</v-icon>
              <v-icon v-if="player.activeJoker == 'spy'" color="green" x-small>mdi-domino-mask</v-icon>
              <v-icon
                v-if="player.activeJoker == 'hint'"
                color="green"
                x-small
              >mdi-form-textbox-password</v-icon>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon class="my-auto">
          <v-icon v-if="isCorrectAnswer(playerIndex)" color="light-green darken-2">mdi-check-bold</v-icon>
          <v-icon v-else color="red">mdi-close-thick</v-icon>
        </v-list-item-icon>

        <v-list-item-action v-if="isMaster && !revealedAnswers[playerIndex]">
          <v-btn @click="clickRevealAnswer(playerIndex)" class="ma-2" text icon color="primary">
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider class="mx-3" v-if="playerIndex < players.length - 1" />
    </div>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import PlayerInfo from '~/types/interfaces/game/playerInfo'
import { JokerTypes } from '~/types/enums/game/jokerTypes'
import GameInfo, { QuestionResult } from '~/types/interfaces/game/gameInfo'
import RevealedAnswers from '~/types/interfaces/master/revealedAnswers'

@Component
export default class PlayerList extends Vue {
  @Prop({ default: [] }) players!: PlayerInfo[]
  @Prop({ default: [] }) gameInfo!: GameInfo | null

  @Prop({ default: false, type: Boolean }) isMaster!: boolean

  revealedAnswers: boolean[] = []

  getResultOfPlayer(name: string): QuestionResult | undefined {
    return this.gameInfo?.questionResults?.find((player) => player.name == name)
  }

  getNameAbbreviation(name: string | undefined): string {
    if (name === undefined) return ''
    if (name.length < 3) return name
    else return name.substring(0, 2)
  }

  isRevealed(index: number): boolean {
    return this.revealedAnswers[index]
  }

  isCorrectAnswer(index: number): boolean {
    return this.getResultOfPlayer(this.players[index].name)?.isCorrect ?? false
  }

  clickRevealAnswer(index: number) {
    this.$set(this.revealedAnswers, index, true)
    this.emitRevealedAnswers()
  }

  mounted() {
    // Each answer is not revealed by default!
    this.revealedAnswers = new Array(this.players.length).fill(false)
  }

  // NETWORK CODE

  emitRevealedAnswers() {
    let reveals: RevealedAnswers = []
    for (let i = 0; i < this.revealedAnswers.length; i++) {
      reveals.push({
        name: this.players[i].name,
        isRevealed: this.revealedAnswers[i],
      })
    }
    this.$socket.client.emit('revealed_answers', reveals)
  }
}
</script>
