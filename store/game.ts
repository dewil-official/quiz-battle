import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import GameUpdate, { GameData } from '~/types/interfaces/game/gameUpdate'
import GameState from '~/types/interfaces/game/gameState'

@Module({ stateFactory: true })
// This store is received by all players, but different versions each
// It depends on their permission leven and whether they have
// activated a Joker that allows them to see other answers for example.
export default class GameStore extends VuexModule implements GameState {
  gameData: GameData | null = null

  @Mutation
  SOCKET_GAME_UPDATE(gameUpdate: GameUpdate | GameData) {
    if (this.gameData == null) this.gameData = gameUpdate as GameData
    if (gameUpdate.gameInfo != null)
      this.gameData.gameInfo = gameUpdate.gameInfo
    if (gameUpdate.players != null) this.gameData.players = gameUpdate.players
    if (gameUpdate.question != null)
      this.gameData.question = gameUpdate.question
  }
}
