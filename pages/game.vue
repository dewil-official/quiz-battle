<template>
  <div>
    <div v-if="hasGameData">
      <Waiting v-if="gameStage == GameStage.waiting" />
      <Intro v-if="gameStage == GameStage.intro" />
      <Question v-if="gameStage == GameStage.question" :gameData="gameData" />
      <AnswerEvaluation v-if="gameStage == GameStage.answerEvaluation" :gameData="gameData" />
      <QuestionResults v-if="gameStage == GameStage.questionResults" :gameData="gameData" />
      <Paused v-if="gameStage == GameStage.paused" />
      <End v-if="gameStage == GameStage.end" />
    </div>
    <LoadingPage v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue, State } from 'nuxt-property-decorator'
import AuthState from '~/types/interfaces/auth/authState'
import GameState from '~/types/interfaces/game/gameState'
import { GameData } from '~/types/interfaces/game/gameUpdate'
import { GameStage } from '~/types/enums/game/gameStage'
import AuthStore from '~/store/auth'
import MasterView from '~/components/pages/game/MasterView.vue'
import PlayerView from '~/components/pages/game/PlayerView.vue'
import LoadingPage from '~/components/shared/LoadingPage.vue'
import Waiting from '~/components/pages/game/master/Waiting.vue'
import Intro from '~/components/pages/game/master/Intro.vue'
import Question from '~/components/pages/game/master/Question.vue'
import AnswerEvaluation from '~/components/pages/game/master/AnswerEvaluation.vue'
import QuestionResults from '~/components/pages/game/master/QuestionResults.vue'
import Paused from '~/components/pages/game/master/Paused.vue'
import End from '~/components/pages/game/master/End.vue'

@Component({
  components: {
    MasterView,
    PlayerView,
    LoadingPage,
    Waiting,
    Intro,
    Question,
    AnswerEvaluation,
    QuestionResults,
    Paused,
    End,
  },
})
export default class GamePage extends Vue {
  // Makes type available inside <template>
  GameStage: any = GameStage

  @State('game') gameState!: GameState
  @State('auth') authState!: AuthState

  get gameData(): GameData | null {
    return this.gameState.gameData
  }

  get gameStage(): GameStage | null {
    return this.gameData?.gameInfo.gameStage ?? null
  }

  get hasGameData(): boolean {
    if (this.isGameData(this.gameData) && this.gameData) {
      return true
    } else {
      return false
    }
  }

  isGameData(object: any): object is GameData {
    return object
  }

  mounted() {
    if (this.authState.token) {
      this.$socket.client.emit('get_game_update', this.authState.token)
    } else {
      this.$router.push('/')
    }
  }
}
</script>
