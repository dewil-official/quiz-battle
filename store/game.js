export const state = () => ({
  scoreboard: [],
  question: {},
})

export const mutations = {
  SOCKET_SCORE_UPDATE(state, scoreboard) {
    state.scoreboard = scoreboard
  },
  SOCKET_QUESTION_UPDATE(state, question) {
    state.question = question
  },
}
