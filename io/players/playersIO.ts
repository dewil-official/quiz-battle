import { Socket } from 'socket.io'
import UserStore from '../core/userStore'

export default class PlayersIO {
  userStore: UserStore

  constructor(userStore: UserStore) {
    this.userStore = userStore
  }

  registerSocketHandlers(socket: Socket) {
    socket.on('get_player_names', () => {
      try {
        let userNames = this.userStore.users.map((user: any) => {
          return user.name
        })

        console.log(userNames)

        socket.emit('player_names', userNames)
      } catch (e) {
        throw Error('PlayersIO: There was an error getting the UserNames')
      }
    })
  }
}
