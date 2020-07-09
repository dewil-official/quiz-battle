import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Scoreboard from '~/types/game/scoreboard'
import Question from '~/types/game/question'
import GameUpdate from '~/types/game/gameUpdate'

@Module
export default class GameStore extends VuexModule {
  scoreboard: Scoreboard = { scores: [] }
  question: Question = { text: '', category: '', correctAnswer: '' }

  @Mutation
  UPDATE_SCOREBOARD() {}

  @Mutation
  UPDATE_QUESTION() {}

  @Action
  SOCKET_GAME_UPDATE(gameUpdate: GameUpdate) {
    if (gameUpdate.question) {
      this.context.commit('UPDATE_QUESTION', gameUpdate.question)
    }
    if (gameUpdate.scoreboard) {
      this.context.commit('UPDATE_SCOREBOARD', gameUpdate.scoreboard)
    }
  }
}
