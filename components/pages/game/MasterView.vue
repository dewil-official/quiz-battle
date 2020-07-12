<template>
  <div>
    <Waiting v-if="gameStage == 'waiting'" />
    <Intro v-if="gameStage == 'intro'" />
    <Question v-if="gameStage == 'question'" />
    <AnswerEvaluation v-if="gameStage == 'answerEvaluation'" />
    <QuestionResults v-if="gameStage == 'questionResults'" />
    <Paused v-if="gameStage == 'paused'" />
    <End v-if="gameStage == 'end'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { QuestionType } from '../../../types/interfaces/game/questionTypes'
import Waiting from '@/components/pages/game/master/Waiting.vue'
import Intro from '@/components/pages/game/master/Intro.vue'
import Question from '@/components/pages/game/master/Question.vue'
import AnswerEvaluation from '@/components/pages/game/master/AnswerEvaluation.vue'
import QuestionResults from '@/components/pages/game/master/QuestionResults.vue'
import Paused from '@/components/pages/game/master/Paused.vue'
import End from '@/components/pages/game/master/End.vue'
import { GameStage } from '../../../types/enums/game/gameStage'

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
  gameInfo: GameStage = GameStage.question
  questionType: QuestionType = QuestionType.choice

  // Cannot use the enum in Vue Template, so..
  get questionTypeString(): string {
    if (this.questionType == QuestionType.normal) return 'normal'
    if (this.questionType == QuestionType.choice) return 'choice'
    if (this.questionType == QuestionType.guess) return 'guess'
    if (this.questionType == QuestionType.media) return 'media'
    return 'normal'
  }

  get gameStage(): string {
    if (this.gameInfo == GameStage.waiting) return 'waiting'
    if (this.gameInfo == GameStage.intro) return 'intro'
    if (this.gameInfo == GameStage.question) return 'question'
    if (this.gameInfo == GameStage.answerEvaluation) return 'answerEvaluation'
    if (this.gameInfo == GameStage.questionResults) return 'questionResults'
    if (this.gameInfo == GameStage.paused) return 'paused'
    if (this.gameInfo == GameStage.end) return 'end'
    return ''
  }
}
</script>
