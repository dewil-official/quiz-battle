import AuthUtils from './authUtils'
import { Socket, Packet } from 'socket.io'

export default class AuthIO {
  authUtils: AuthUtils

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
  }

  registerSocketHandlers(socket: Socket) {
    // "data" should be { name: "", password: "" }
    socket.on('auth_data', (data) => {
      let token
      try {
        token = this.authUtils.loginUser(data)
        socket.emit('auth_success', token)
      } catch (e) {
        console.error(e)
        socket.emit('auth_error', e.message)
      }
    })
    socket.on('log_out', (authToken) => {
      try {
        this.authUtils.logoutUser(authToken)
      } catch (e) {
        console.error(e)
      }
    })
    socket.on('disconnect', () => {
      this.authUtils.removeSocket(socket.id)
    })
    // Will be executed for every request, and when
    // the user is found by token, the socket is saved.
    socket.use((packet: Packet, next) => {
      // 1. Check if payload is an authToken
      if (typeof packet[1] == 'string') {
        let maybeToken = packet[1] as string
        if (maybeToken.length > 6) {
          try {
            this.authUtils.setSocketId(socket.id, maybeToken)
          } catch (e) {
            return
          }
        }
      }
      next()
    })
  }
}
