export default class GameIO {
  registerSockerHandlers(socket) {
    socket.on('get_game_state', (token) => {
      // 1. Verify Token
      // => Else, send error
      //
      // 2. Get Game Data
      //
      // 3. Send it to the client
    })
  }
}
