<template>
  <v-container>
    <v-row class="ma-n4">
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 pa-4" elevation="12">
          <NormalQuestion
            v-if="gameState.question.type == QuestionType.normal"
            :question="gameState.question"
          />
          <ChoiceQuestion
            v-if="gameState.question.type == QuestionType.choice"
            :question="gameState.question"
          />
          <GuessQuestion
            v-if="gameState.question.type == QuestionType.guess"
            :question="gameState.question"
          />
          <MediaQuestion
            v-if="gameState.question.type == QuestionType.media"
            :question="gameState.question"
          />
        </v-card>
        <v-card class="ma-4 mt-8 py-4" elevation="12">
          <v-row class="mx-4" align="center">
            <v-btn small>Back</v-btn>
            <v-spacer></v-spacer>
            <v-chip small>1 / 10</v-chip>
            <v-spacer></v-spacer>
            <v-btn small>Continue</v-btn>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 px-3 py-5" elevation="12">
          <h2 class="px-4">Players</h2>
          <PlayerList class="mt-4" :players="gameState.players" answerMode />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { QuestionType } from '~/types/interfaces/game/questionTypes'
import PlayerList from '../shared/PlayerList.vue'
import NormalQuestion from '../shared/questionTypes/NormalQuestion.vue'
import ChoiceQuestion from '../shared/questionTypes/ChoiceQuestion.vue'
import GuessQuestion from '../shared/questionTypes/GuessQuestion.vue'
import MediaQuestion from '../shared/questionTypes/MediaQuestion.vue'

@Component({
  components: {
    PlayerList,
    NormalQuestion,
    ChoiceQuestion,
    GuessQuestion,
    MediaQuestion,
  },
})
export default class Question extends Vue {
  QuestionType: any = QuestionType

  get gameState() {
    return this.$store.state.game
  }
}
</script>
