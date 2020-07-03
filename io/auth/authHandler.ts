import { Socket } from 'socket.io'
import { AuthUtils } from './authUtils'
import { LoginData, LoginToken } from '~/types/socketInterfaces'

export class AuthHandler {
  authUtils: AuthUtils

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
  }

  login(socket: Socket) {
    console.log('Received LOGIN socket event')
    try {
      let loginToken: LoginToken = this.authUtils.getTokenAndVerifyLoginData(
        (socket.json as unknown) as LoginData
      )
      if (loginToken == null) throw Error
      if (loginToken.token == null || loginToken.token == '') throw Error

      socket.emit('auth-token', loginToken)
    } catch (e) {
      socket.emit('auth-error')
    }
  }

  getUserList(socket: Socket) {}
}
