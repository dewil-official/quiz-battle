import AuthUtils from './authUtils'
import { Socket } from 'socket.io'

export default class AuthIO {
  authUtils: AuthUtils

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
  }

  registerSocketHandlers(socket: Socket) {
    // "data" should be { name: "", password: "" }
    socket.on('login', (data) => {
      let token
      try {
        token = this.authUtils.loginUser(data)
        socket.emit('auth_success', token)
      } catch (e) {
        console.log(e.toString())
        socket.emit('auth_error', e.message)
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
