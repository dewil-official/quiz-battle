import http from 'http'
import socketIO, { Socket } from 'socket.io'
import AuthIO from './auth/authIO'
import AuthUtils from './auth/authUtils'
import PlayersIO from './players/playersIO'
import GameIO from './game/gameIO'
import { Module } from '@nuxt/types'
import UserStore from './core/userStore'

let userFile = require('../data/users.json')

const ioModule: Module = function () {
  const userStore = new UserStore(userFile)
  const authUtils = new AuthUtils(userStore)
  const authIO = new AuthIO(authUtils)
  const gameIO = new GameIO(authUtils)
  const playersIO = new PlayersIO(userStore)

  this.nuxt.hook('render:before', () => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port: any, host: any) =>
      new Promise((resolve) =>
        server.listen(port || 3000, host || 'localhost', resolve)
      )
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    io.on('connection', (socket: Socket) => {
      authIO.registerSocketHandlers(socket)
      playersIO.registerSocketHandlers(socket)
      gameIO.registerSocketHandlers(socket)
    })
  })
}

export default ioModule
