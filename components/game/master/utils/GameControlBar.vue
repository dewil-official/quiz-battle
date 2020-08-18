<template>
  <v-row class="mx-4" align="center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="lastQuestion()" v-bind="attrs" v-on="on">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <span>Last Question</span>
    </v-tooltip>
    <v-chip
      label
      color="primary"
      class="mx-2"
    >{{ gameInfo.questionNr + 1 }} / {{ gameInfo.questionCount }}</v-chip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="skipQuestion()" v-bind="attrs" v-on="on">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <span>Skip Question</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-btn
      v-if="isLastStageButtonShown"
      text
      @click="lastStage()"
      class="mr-2 grey--text text--darken-2"
    >
      <v-icon left>mdi-chevron-left</v-icon>Back
    </v-btn>
    <v-btn @click="nextStage()" :color="isContinueGrey ? 'grey' : 'primary'" :text="isContinueGrey">
      {{ contextActions[context] }}
      <v-icon right v-if="context == 'continue'">mdi-chevron-right</v-icon>
      <v-icon right v-if="context == 'accept'">mdi-check-all</v-icon>
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import GameInfo from '~/types/interfaces/game/gameInfo'
import { GameStage } from '~/types/enums/game/gameStage'

@Component
export default class GameControlBar extends Vue {
  @Prop() gameInfo!: GameInfo
  @Prop({ default: false }) isContinueGrey!: boolean

  readonly contextActions = {
    continue: 'Continue',
    accept: 'Accept',
  }

  get authToken(): string {
    return this.$store.state.auth.token
  }

  get isLastStageButtonShown(): boolean {
    if (this.gameInfo.gameStage == GameStage.waiting) return false
    if (this.gameInfo.gameStage == GameStage.intro) return false
    if (this.gameInfo.gameStage == GameStage.question) return false
    return true
  }

  context: string = 'continue'

  lastQuestion() {
    this.$socket.client.emit('last_question', this.authToken)
  }

  skipQuestion() {
    this.$socket.client.emit('next_question', this.authToken)
  }

  lastStage() {
    this.$socket.client.emit('last_stage', this.authToken)
  }

  nextStage() {
    this.$socket.client.emit('next_stage', this.authToken)
  }
}
</script>
