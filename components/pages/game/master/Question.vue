<template>
  <v-container v-if="gameData">
    <v-row class="ma-n4">
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 pa-4" elevation="12">
          <QuestionCard :question="question" />
        </v-card>
        <v-card class="ma-4 mt-8 py-4" v-if="hasChoices" elevation="12">
          <v-list disabled>
            <v-list-item-group
              :value="question.showAnswer ? question.correctAnswer : null"
              color="green darken-4"
            >
              <v-list-item
                v-for="(choice, choiceIndex) in question.choices"
                :key="choiceIndex"
                :value="choice"
              >
                <v-list-item-icon>
                  <v-icon large v-if="choiceIndex == 0">mdi-alpha-a</v-icon>
                  <v-icon large v-if="choiceIndex == 1">mdi-alpha-b</v-icon>
                  <v-icon large v-if="choiceIndex == 2">mdi-alpha-c</v-icon>
                  <v-icon large v-if="choiceIndex == 3">mdi-alpha-d</v-icon>
                  <v-icon large v-if="choiceIndex == 4">mdi-alpha-e</v-icon>
                  <v-icon large v-if="choiceIndex == 5">mdi-alpha-f</v-icon>
                  <v-icon large v-if="choiceIndex == 6">mdi-alpha-g</v-icon>
                  <v-icon large v-if="choiceIndex == 7">mdi-alpha-h</v-icon>
                  <v-icon large v-if="choiceIndex > 7">mdi-numeric-{{choiceIndex + 1}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title style="white-space: normal;">{{ choice }}</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card class="ma-4 mt-8 py-4" elevation="12">
          <v-row class="mx-4" align="center">
            <v-btn small @click="lastQuestion">Back</v-btn>
            <v-spacer></v-spacer>
            <v-chip
              small
            >{{ gameData.gameInfo.questionNr + 1 }} / {{ gameData.gameInfo.questionCount }}</v-chip>
            <v-spacer></v-spacer>
            <v-btn small @click="continueGame">Continue</v-btn>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 px-3 py-5" elevation="12">
          <h2 class="px-4">Players</h2>
          <PlayerList class="mt-4" :players="gameData.players" answerMode />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import {
  QuestionType,
  ChoiceQuestion,
  GuessQuestion,
} from '~/types/interfaces/game/questionTypes'
import PlayerList from '../shared/PlayerList.vue'
import QuestionCard from '../shared/QuestionCard.vue'
import { GameData } from '~/types/interfaces/game/gameUpdate'

@Component({
  components: {
    PlayerList,
    QuestionCard,
  },
})
export default class Question extends Vue {
  QuestionType: any = QuestionType

  @Prop({ default: null }) gameData!: GameData | null

  get question() {
    return this.gameData!.question
  }

  get authToken(): string {
    return this.$store.state.auth.token
  }

  get hasChoices(): boolean {
    if (((this.gameData!.question as unknown) as ChoiceQuestion).choices) {
      return true
    } else {
      return false
    }
  }

  lastQuestion() {
    this.$socket.client.emit('last_question', this.authToken)
  }

  continueGame() {
    this.$socket.client.emit('next_question', this.authToken)
  }
}
</script>
