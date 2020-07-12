import AuthUtils from './authUtils'
import { Socket } from 'socket.io'

export default class AuthIO {
  authUtils: AuthUtils

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
  }

  registerSocketHandlers(socket: Socket) {
    socket.on('login', (loginData) => {
      let token
      try {
        token = this.authUtils.loginUser(loginData)
        socket.emit('login_success', token)
      } catch (e) {
        console.log(e.toString())
        socket.emit('login_error', e.message)
      }
    })
    socket.on('logout', (authToken) => {
      try {
        this.authUtils.logoutUser(authToken)
      } catch (e) {
        console.log(e.toString())
      }
    })
  }
}
