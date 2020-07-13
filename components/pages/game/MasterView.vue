<template>
  <div>
    <Waiting v-if="gameStage == GameStage.waiting" />
    <Intro v-if="gameStage == GameStage.intro" />
    <Question v-if="gameStage == GameStage.question" :gameData="gameData" />
    <AnswerEvaluation v-if="gameStage == GameStage.answerEvaluation" />
    <QuestionResults v-if="gameStage == GameStage.questionResults" :gameData="gameData" />
    <Paused v-if="gameStage == GameStage.paused" />
    <End v-if="gameStage == GameStage.end" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { QuestionType } from '../../../types/interfaces/game/questionTypes'
import Waiting from '@/components/pages/game/master/Waiting.vue'
import Intro from '@/components/pages/game/master/Intro.vue'
import Question from '@/components/pages/game/master/Question.vue'
import AnswerEvaluation from '@/components/pages/game/master/AnswerEvaluation.vue'
import QuestionResults from '@/components/pages/game/master/QuestionResults.vue'
import Paused from '@/components/pages/game/master/Paused.vue'
import End from '@/components/pages/game/master/End.vue'
import { GameStage } from '../../../types/enums/game/gameStage'
import GameUpdate, { GameData } from '../../../types/interfaces/game/gameUpdate'

@Component({
  components: {
    Waiting,
    Intro,
    Question,
    AnswerEvaluation,
    QuestionResults,
    Paused,
    End,
  },
})
export default class MasterView extends Vue {
  GameStage: any = GameStage

  @Prop() gameData!: GameData

  get gameStage(): GameStage {
    return this.gameData.gameInfo.gameStage
  }
}
</script>
