export const state = () => ({
  playerAnswers: [],
  playerJokers: [],
})

export const mutations = {
  SOCKET_ANSWERS_UPDATE(state, answers) {
    state.playerAnswers = answers
  },
  SOCKET_JOKERS_UPDATE(state, jokers) {
    state.playerJokers = jokers
  },
}
