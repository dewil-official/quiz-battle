import { AuthStatus } from '~/types/auth'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export default class AuthStore extends VuexModule {
  status: AuthStatus = AuthStatus.NONE
  token: string = ''
  error: string = ''
  playerNames: string[] = []

  @Mutation
  SOCKET_AUTH_SUCCESS(token: string) {
    this.status = AuthStatus.SUCCESS
    this.token = token
  }

  @Mutation
  SOCKET_AUTH_ERROR(error: string) {
    this.status = AuthStatus.ERROR
    this.error = error
  }

  @Mutation
  SOCKET_PLAYER_NAMES(playerNames: string[]) {
    this.playerNames = playerNames
  }
}
