import { AuthState } from '~/types/state/authState'

export const state: AuthState = {
  status: '',
}

export const mutations = {
  AUTH_SUCCESS(token: string) {
    state.token = token
    state.status = 'success'
  },
  AUTH_ERROR(error: string) {
    ;(state.error = error), (state.status = 'error')
  },
}
