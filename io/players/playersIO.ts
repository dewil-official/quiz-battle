import { Socket } from 'socket.io'
import UserStore from '../core/userStore'
import { User } from '~/types/classes/user'

export default class PlayersIO {
  userStore: UserStore

  constructor(userStore: UserStore) {
    this.userStore = userStore
  }

  registerSocketHandlers(socket: Socket) {
    socket.on('get_player_names', () => {
      try {
        let userNames = this.userStore.users.map((user: User) => {
          return user.authData.name
        })

        socket.emit('player_names', userNames)
      } catch (e) {
        throw Error('PlayersIO: There was an error getting the UserNames')
      }
    })
  }
}
