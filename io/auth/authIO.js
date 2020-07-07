//import socketIO from 'socket.io'
//import AuthUtils from './authUtils'

export default class AuthIO {
  constructor(authUtils) {
    this.authUtils = authUtils
  }

  registerSocketHandlers(socket) {
    // "data" should be { name: "", password: "" }
    socket.on('auth_data', (data) => {
      let token
      try {
        token = this.authUtils.loginUser(data)
        socket.emit('auth_success', token)
      } catch (e) {
        console.log('Error:')
        console.log(e.toString())
        socket.emit('auth_error', e.message)
      }
    })
  }
}
