import { authStatus } from '~/types/auth'

export const state = () => ({
  status: authStatus.NONE,
  token: '',
  error: '',
})

export const mutations = {
  SOCKET_AUTH_SUCCESS(state, token) {
    state.status = authStatus.SUCCESS
    state.token = token
  },
  SOCKET_AUTH_ERROR(state, error) {
    state.status = authStatus.ERROR
    state.error = error
  },
}
