import { UserAuthStatus } from '~/types/enums/auth/userAuthStatus'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ stateFactory: true })
export default class AuthStore extends VuexModule {
  status: UserAuthStatus = UserAuthStatus.NONE
  token: string = ''
  error: string = ''
  playerNames: string[] = []

  @Mutation
  SOCKET_AUTH_SUCCESS(token: string) {
    this.status = UserAuthStatus.SUCCESS
    this.token = token
  }

  @Mutation
  SOCKET_AUTH_ERROR(error: string) {
    this.status = UserAuthStatus.ERROR
    this.error = error
  }

  @Mutation
  SOCKET_PLAYER_NAMES(playerNames: string[]) {
    this.playerNames = playerNames
  }

  @Mutation
  LOG_OUT() {
    this.status = UserAuthStatus.NONE
    this.token = ''
    this.error = ''
  }

  get isLoggedIn() {
    if (this.status == UserAuthStatus.SUCCESS) {
      return true
    } else {
      return false
    }
  }
}
