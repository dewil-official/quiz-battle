let userFile = require('../../data/users.json')

export default class PlayersIO {
  registerSocketHandlers(socket) {
    socket.on('get_player_names', () => {
      try {
        let userNames = userFile.userList.map((user) => {
          return user.name
        })

        socket.emit('player_names', userNames)
      } catch (e) {
        console.log('Your data/users.json file cannot be loaded.')
      }
    })
  }
}
