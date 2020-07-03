import socketIO, { Socket } from 'socket.io'
import { User } from '~/types/user'
import { AuthHandler } from './auth/authHandler'
import { AuthUtils } from './auth/authUtils'
import { LoginData } from '~/types/socketInterfaces'
let userFile = require('../data/users.json')

export class ConnHandler {
  // Handlers
  authHandler: AuthHandler

  constructor() {
    // Dependency Injection
    this.authHandler = new AuthHandler(new AuthUtils(userFile))
  }

  registerEvents(socket: Socket) {
    socket.on('auth-login', (data: LoginData) => {
      this.authHandler.login(socket, data)
    })
  }
}
