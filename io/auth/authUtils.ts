import { uid } from 'rand-token'
import LoginData from '~/types/interfaces/auth/loginData'
import { User } from '~/types/classes/user'
import UserStore from '../core/userStore'

export default class AuthUtils {
  userStore: UserStore

  constructor(userStore: UserStore) {
    this.userStore = userStore
  }

  loginUser(loginData: LoginData) {
    console.log('Logging in user', loginData.name)
    let user = this.userStore.getUserByName(loginData.name)
    if (user.authData.password == loginData.password) {
      let usedTokens = getActiveTokens(this.userStore.users)
      let newToken = generateToken(usedTokens)
      this.userStore.saveToken(user.authData.name!, newToken)
      return newToken
    } else {
      throw new Error('Wrong Password.')
    }
  }

  logoutUser(authToken: string) {
    this.userStore.removeUser(authToken)
  }

  isValidToken(authToken: string) {
    let activeTokens = getActiveTokens(this.userStore.users)
    return activeTokens.includes(authToken)
  }

  isAdmin(authToken: string) {
    let user = this.userStore.getUserByToken(authToken)
    if (user.authData.isAdmin) return true
    return false
  }

  getName(authToken: string) {
    let user = this.userStore.getUserByToken(authToken)
    return user.authData.name
  }
  removeSocket(socketId: string) {
    this.userStore.users.forEach((user) => {
      if (user.connectionData.socketId == socketId) {
        user.connectionData.socketId = null
        console.log('Removed socketId from user', user.authData.name)
      }
    })
  }
  setSocketId(socketId: string, token: string) {
    this.userStore.users.forEach((user) => {
      if (user.authData.token == token) {
        user.connectionData.socketId = socketId
        console.log('Added socketId to user', user.authData.name)
      }
    })
  }
  forEachConnected(callback: (user: User) => any) {
    this.userStore.users.forEach((user) => {
      if (user.connectionData.socketId) {
        callback(user)
      }
    })
  }
}

function getActiveTokens(userList: Array<User>) {
  return Array.from(
    userList,
    // TODO: Find a better way to only map if existant
    (x) => x.authData.token || ''
  )
}

function generateToken(usedTokens: Array<string>) {
  let newToken = ''
  let isUnique = false
  while (isUnique == false) {
    newToken = uid(8)
    isUnique = true
    usedTokens.forEach((token) => {
      if (token == newToken) isUnique = false
    })
  }
  return newToken
}
