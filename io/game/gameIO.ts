import Game from './game'
import { Socket } from 'socket.io'
import { AuthErrorType } from '../../types/enums/errors/authErrorType'
import AuthUtils from '../auth/authUtils'
import GameUpdate from '~/types/interfaces/game/gameUpdate'

export default class GameIO {
  authUtils: AuthUtils
  game: Game

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
    this.game = new Game(authUtils)
  }

  registerSocketHandlers(socket: Socket) {
    socket.on('get_game_update', (token) => {
      // 1. Verify Token
      if (this.authUtils.isValidToken(token) == false) {
        socket.emit('auth_error', AuthErrorType.invalidToken)
        return
      }
      // 2. Get Game Data
      let gameUpdate: GameUpdate
      try {
        gameUpdate = this.game.getGameUpdateForUser(token)
        // 3. Send it to the client
        socket.emit('game_update', gameUpdate)
      } catch (e) {}
    })
  }
}
