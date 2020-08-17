<template>
  <v-row class="mx-4" align="center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="lastQuestion" v-bind="attrs" v-on="on">
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
        <v-btn icon @click="skipQuestion" v-bind="attrs" v-on="on">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>
      <span>Skip Question</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="clickContinue">
      {{ contextActions[context] }}
      <v-icon right v-if="context == 'continue'">mdi-chevron-right</v-icon>
      <v-icon right v-if="context == 'accept'">mdi-check-all</v-icon>
    </v-btn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import GameInfo from '~/types/interfaces/game/gameInfo'

@Component
export default class GameControlBar extends Vue {
  @Prop() gameInfo!: GameInfo

  readonly contextActions = {
    continue: 'Continue',
    accept: 'Accept',
  }

  get authToken(): string {
    return this.$store.state.auth.token
  }

  context: string = 'continue'

  lastQuestion() {
    this.$socket.client.emit('last_question', this.authToken)
  }

  skipQuestion() {
    this.$socket.client.emit('next_question', this.authToken)
  }

  clickContinue() {}
}
</script>