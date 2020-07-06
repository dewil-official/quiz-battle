//import socketIO from 'socket.io'
import AuthUtils from './authUtils'

let userFile = require('../../data/users.json')

export default class AuthIO {
  constructor() {
    this.authUtils = new AuthUtils(userFile)
  }

  registerSocketHandlers(socket) {
    // "data" should be { name: "", password: "" }
    socket.on('auth_data', (data) => {
      let token
      try {
        token = this.authUtils.loginUser(data)
      } catch (e) {}
      if (token) socket.emit('auth_success', token)
      else socket.emit('auth_error')
    })
  }
}
