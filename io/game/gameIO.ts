import Game from './game'
import { Socket, Server } from 'socket.io'
import { AuthErrorType } from '../../types/enums/errors/authErrorType'
import AuthUtils from '../auth/authUtils'
import GameUpdate from '~/types/interfaces/game/gameUpdate'
import { UpdateTarget } from '../../types/enums/game/sendTarget'
import { User } from '~/types/classes/user'
import ApprovedAnswers from '~/types/interfaces/master/approvedAnswers'

export default class GameIO {
  authUtils: AuthUtils
  game: Game
  io: Server

  constructor(authUtils: AuthUtils, io: Server) {
    this.authUtils = authUtils
    this.game = new Game(authUtils)
    this.io = io
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

    socket.on('start_game', (token) => {
      if (this.authUtils.isAdmin(token)) {
        this.game.startGame()
        this.sendGameUpdate(UpdateTarget.everybody)
      }
    })

    socket.on('last_question', (token) => {
      if (this.authUtils.isAdmin(token)) {
        this.game.lastQuestion()
        this.sendGameUpdate(UpdateTarget.everybody)
      }
    })

    socket.on('next_question', (token) => {
      if (this.authUtils.isAdmin(token)) {
        this.game.nextQuestion()
        this.sendGameUpdate(UpdateTarget.everybody)
      }
    })

    socket.on('last_stage', (token) => {
      if (this.authUtils.isAdmin(token)) {
        this.game.lastQuestionStage()
        this.sendGameUpdate(UpdateTarget.everybody)
      }
    })

    socket.on('next_stage', (token) => {
      if (this.authUtils.isAdmin(token)) {
        this.game.nextQuestionStage()
        this.sendGameUpdate(UpdateTarget.everybody)
      }
    })

    socket.on(
      'approve_answers',
      (authToken: string, approvals: ApprovedAnswers) => {
        if (this.authUtils.isAdmin(authToken)) {
          this.game.applyQuestionResults(approvals)
          this.sendGameUpdate(UpdateTarget.everybody)
        }
      }
    )
  }

  sendGameUpdate(target: UpdateTarget) {
    if (target == UpdateTarget.everybody) {
      this.authUtils.forEachConnected((user: User) => {
        let gameUpdate: GameUpdate = this.game.getGameUpdateForUser(
          user.authData.token!
        )
        this.io
          .to(user.connectionData.socketId!)
          .emit('game_update', gameUpdate)
      })
    } else if (target == UpdateTarget.adminsAndSpies) {
      // TODO: Implement
    } else if (target == UpdateTarget.userAndAdmin) {
      // TODO: Implement
    }
  }
}
