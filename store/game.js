export const state = () => ({
  scoreboard: [],
  question: {},
})

export const mutations = {
  SOCKET_GAME_UPDATE(state, gameData) {
    this.scoreboard = gameData.scoreboard
    this.question = gameData.question
  },
}
