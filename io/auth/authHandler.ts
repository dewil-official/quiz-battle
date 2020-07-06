import { Socket } from 'socket.io'
import { AuthUtils } from './authUtils'
import { AuthToken, AuthData, AuthError } from '~/types/networking/auth'

export class AuthHandler {
  authUtils: AuthUtils

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
  }

  login(socket: Socket, data: AuthData) {
    console.log('Received LOGIN socket event')
    try {
      let loginToken: AuthToken = this.authUtils.getTokenAndVerifyLoginData(
        data
      )
      if (loginToken == null) throw Error
      if (loginToken.token == null || loginToken.token == '') throw Error

      socket.emit('SOCKET_AUTH_SUCCESS', loginToken)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
        let authError: AuthError = { message: e.message }
        socket.emit('SOCKET_AUTH_ERROR', authError)
      }
    }
  }

  getUserList(socket: Socket) {}
}
