import http from 'http'
import socketIO from 'socket.io'
import { Module } from '@nuxt/types'
import { ConnHandler } from './connHandler'

const ioModule: Module = function () {
  let connHandler = new ConnHandler()

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
    const messages = []
    io.on('connection', (socket) => {
      connHandler.registerEvents
    })
  })
}

export default ioModule
