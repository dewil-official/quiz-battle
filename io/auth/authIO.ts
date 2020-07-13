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
        console.log(e.toString())
        socket.emit('auth_error', e.message)
      }
    })
    socket.on('log_out', (authToken) => {
      try {
        this.authUtils.logoutUser(authToken)
      } catch (e) {
        console.log(e.toString())
      }
    })
    socket.on('disconnect', () => {
      this.authUtils.removeSocket(socket.id)
    })
    // Will be executed for every request, and when
    // the user is found by token, the socket is saved.
    socket.use((packet: Packet, next) => {
      console.log('Called socket.use. packet[1]:', packet[1])
      // 1. Check if payload is an authToken
      if (typeof packet[1] == 'string') {
        console.log('packet[1] is a string! It is:', packet[1])
        let maybeToken = packet[1] as string
        if (maybeToken.length > 6) {
          try {
            console.log('Now calling setSocketId')
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
