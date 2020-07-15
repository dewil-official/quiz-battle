import { JokerTypes } from '../enums/game/jokerTypes'

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
      score: 0,
      jokers: [],
      activeJoker: null,
      isDone: false,
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
  isAdmin?: boolean
}

export interface UserConnectionData {
  socketId: string | null
}

export interface UserGameData {
  answer: string
  score: number
  jokers: JokerTypes[]
  activeJoker: null | JokerTypes
  isDone: boolean
}
