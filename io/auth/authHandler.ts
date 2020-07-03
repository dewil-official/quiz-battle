import { Socket } from 'socket.io'
import { AuthUtils } from './authUtils'
import { LoginData, LoginToken } from '~/types/socketInterfaces'

export class AuthHandler {
  authUtils: AuthUtils

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
  }

  login(socket: Socket, data: LoginData) {
    console.log('Received LOGIN socket event')
    try {
      let loginToken: LoginToken = this.authUtils.getTokenAndVerifyLoginData(
        data
      )
      if (loginToken == null) throw Error
      if (loginToken.token == null || loginToken.token == '') throw Error

      socket.emit('auth-success', loginToken)
      //      socket.emit('auth-success', loginToken)
    } catch (e) {
      socket.emit('auth-error')
      //      socket.emit('auth-error')
    }
  }

  getUserList(socket: Socket) {}
}
