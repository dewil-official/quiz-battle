// import Vue from 'vue'
// import io from 'socket.io-client'
// import VueSocketIOExt from 'vue-socket.io-extended'

// const socket = io(process.env.WS_URL as string)

// Vue.use(VueSocketIOExt, socket, { authStore, playersStore })

// -------------------------------

// declare module 'vue/types/vue' {
//   interface Vue {
//     $socket: VueSocketIOExt
//   }
// }

// Vue.prototype.$myInjectedFunction = (message: string) => console.log(message)

// ----------------------------------

// import io from 'socket.io-client'
// import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io-extended'

// const socket = io('http://localhost:3333')
// export default ({ store }) => {
//   Vue.use(VueSocketIO, socket, { store })
// }

// ----------------------------------

import io from 'socket.io-client'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io-extended'
import { Context } from 'vm'

export default (context: Context) => {
  const socket = io(process.env.WS_URL as string)
  const store = context.store
  Vue.use(VueSocketIO, socket, { store })
}
