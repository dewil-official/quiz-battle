import { Socket } from 'socket.io'

let userFile = require('../../data/users.json')

export default class PlayersIO {
  registerSocketHandlers(socket: Socket) {
    socket.on('get_player_names', () => {
      try {
        let userNames = userFile.userList.map((user: any) => {
          return user.name
        })

        console.log(userNames)

        socket.emit('player_names', userNames)
      } catch (e) {
        console.log('Your data/users.json file cannot be loaded.')
      }
    })
  }
}
