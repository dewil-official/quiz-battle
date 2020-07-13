import { AuthErrorType } from '../enums/errors/authErrorType'

export class AuthError extends Error {
  type: AuthErrorType

  constructor(type: AuthErrorType) {
    super()
    this.type = type
  }
}
