import Vue from 'vue'
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

const socket = io(process.env.WS_URL as string, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
})

export default (context: any) => {
  let store = context.store
  Vue.use(VueSocketIOExt, socket, { store })
}
