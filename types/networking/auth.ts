export enum AuthState {
  none,
  success,
  error,
}

export interface AuthData {
  name: string
  password: string
}

export interface AuthToken {
  token: string
}

export interface AuthError {
  message: string
}
