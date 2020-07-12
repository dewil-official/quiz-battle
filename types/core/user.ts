export class User {
  authData: UserAuthData
  connectionData: UserConnectionData
  gameData: UserGameData

  constructor(authData: UserAuthData) {
    this.authData = authData
    this.connectionData = {
      socketId: null,
    }
    this.gameData = {
      answer: '',
    }
  }

  get isLoggedIn(): boolean {
    if (this.authData.token) return true
    return false
  }

  get isConnected(): boolean {
    if (this.connectionData.socketId != null) return true
    return false
  }
}

export interface UserAuthData {
  name: string
  password: string
  token?: string
}

export interface UserConnectionData {
  socketId: string | null
}

export interface UserGameData {
  answer: string
}
