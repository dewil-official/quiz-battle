import Game from './game'
import { Socket } from 'socket.io'
import { AuthError } from '../../types/enums/errors/authErrors'

export default class GameIO {
  authUtils: any
  game: Game

  constructor(authUtils: any) {
    this.authUtils = authUtils
    this.game = new Game()
  }

  registerSocketHandlers(socket: Socket) {
    socket.on('get_game_state', (token) => {
      // 1. Verify Token
      if (this.authUtils.isValidToken(token) == false) {
        socket.emit('auth_error', AuthError.invalidToken)
        return
      }
      // 2. Get Game Data
      let gameData = this.game.getGameData()
      // 3. Send it to the client
      socket.emit('game_update', gameData)
    })
  }
}
