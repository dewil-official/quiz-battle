import { errorTypes } from '../../types/errorTypes'
import Game from './game'

export default class GameIO {
  constructor(authUtils) {
    this.authUtils = authUtils
    this.game = new Game()
  }

  registerSocketHandlers(socket) {
    socket.on('get_game_state', (token) => {
      // 1. Verify Token
      if (this.authUtils.isValidToken(token) == false) {
        socket.emit('auth_error', errorTypes.TOKEN_EXPIRED)
        return
      }
      // 2. Get Game Data
      let gameData = this.game.getGameData()
      // 3. Send it to the client
      socket.emit('game_update', gameData)
    })
  }
}
