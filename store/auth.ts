import { AuthStatus } from '~/types/auth'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ stateFactory: true })
export default class AuthStore extends VuexModule {
  status: AuthStatus = AuthStatus.NONE
  token: string = ''
  error: string = ''
  playerNames: string[] = []

  @Mutation
  SOCKET_LOGIN_SUCCESS(token: string) {
    this.status = AuthStatus.SUCCESS
    this.token = token
  }

  @Mutation
  SOCKET_LOGIN_ERROR(error: string) {
    this.status = AuthStatus.ERROR
    this.error = error
  }

  @Mutation
  SOCKET_PLAYER_NAMES(playerNames: string[]) {
    this.playerNames = playerNames
  }

  @Mutation
  LOG_OUT() {
    this.status = AuthStatus.NONE
    this.token = ''
    this.error = ''
  }

  get isLoggedIn() {
    if (this.status == AuthStatus.SUCCESS) {
      return true
    } else {
      return false
    }
  }
}
