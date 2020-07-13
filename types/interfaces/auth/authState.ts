import { UserAuthStatus } from '~/types/enums/auth/userAuthStatus'
import { AuthErrorType } from '~/types/enums/errors/authErrorType'

export default interface AuthState {
  status: UserAuthStatus
  token: string
  error: AuthErrorType | null
  playerNames: string[]
}
