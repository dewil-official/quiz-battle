import http from 'http'
import socketIO from 'socket.io'
import { ConnHandler } from './connHandler'
import { Module } from '@nuxt/types'

const ioModule: Module = function () {
  this.nuxt.hook('render:before', () => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)
    const connHandler = new ConnHandler()

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port: any, host: any) =>
      new Promise((resolve) =>
        server.listen(port || 3000, host || 'localhost', resolve)
      )
    // close this server on 'close' event
    this.nuxt.hook('close', () => new Promise(server.close))

    // Add socket.io events
    io.on('connection', (socket) => {
      connHandler.registerEvents(socket)
    })
  })
}

export default ioModule
