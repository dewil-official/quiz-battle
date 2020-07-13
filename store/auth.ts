import { UserAuthStatus } from '~/types/enums/auth/userAuthStatus'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { AuthErrorType } from '~/types/enums/errors/authErrorType'
import AuthState from '~/types/interfaces/auth/authState'

@Module({ stateFactory: true })
export default class AuthStore extends VuexModule implements AuthState {
  status: UserAuthStatus = UserAuthStatus.NONE
  token: string = ''
  error: AuthErrorType | null = null
  playerNames: string[] = []

  @Mutation
  SOCKET_AUTH_SUCCESS(token: string) {
    this.status = UserAuthStatus.SUCCESS
    this.token = token
    this.error = null
  }

  @Mutation
  SOCKET_AUTH_ERROR(error: AuthErrorType | null) {
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
    this.error = null
  }

  get isLoggedIn() {
    if (this.status == UserAuthStatus.SUCCESS) {
      return true
    } else {
      return false
    }
  }
}
