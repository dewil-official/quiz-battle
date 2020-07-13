<template>
  <v-container v-if="gameData">
    <v-row class="ma-n4">
      <v-col cols="12" md="6" class="pa-0">
        <v-card class="ma-4 pa-4" elevation="12">
          <NormalQuestion
            v-if="gameData.question.type == QuestionType.normal"
            :question="gameData.question"
          />
          <ChoiceQuestion
            v-if="gameData.question.type == QuestionType.choice"
            :question="gameData.question"
          />
          <GuessQuestion
            v-if="gameData.question.type == QuestionType.guess"
            :question="gameData.question"
          />
          <MediaQuestion
            v-if="gameData.question.type == QuestionType.media"
            :question="gameData.question"
          />
        </v-card>
        <v-card class="ma-4 mt-8 py-4" elevation="12">
          <v-row class="mx-4" align="center">
            <v-btn small>Back</v-btn>
            <v-spacer></v-spacer>
            <v-chip
              small
            >{{ gameData.gameInfo.questionNr + 1 }} / {{ gameData.gameInfo.questionCount }}</v-chip>
            <v-spacer></v-spacer>
            <v-btn small>Continue</v-btn>
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
import { QuestionType } from '~/types/interfaces/game/questionTypes'
import PlayerList from '../shared/PlayerList.vue'
import NormalQuestion from '../shared/questionTypes/NormalQuestion.vue'
import ChoiceQuestion from '../shared/questionTypes/ChoiceQuestion.vue'
import GuessQuestion from '../shared/questionTypes/GuessQuestion.vue'
import MediaQuestion from '../shared/questionTypes/MediaQuestion.vue'
import { GameData } from '~/types/interfaces/game/gameUpdate'

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

  @Prop({ default: null }) gameData!: GameData | null
}
</script>
