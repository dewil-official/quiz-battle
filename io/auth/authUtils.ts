import { uid } from 'rand-token'
import LoginData from '~/types/user/loginData'
import User from '~/types/user/user'
import UserStore from '../core/userStore'

export default class AuthUtils {
  userStore: UserStore

  constructor(userStore: UserStore) {
    this.userStore = userStore
  }

  loginUser(loginData: LoginData) {
    console.log('Logging in user', loginData.name)
    let user = this.userStore.getUserByName(loginData.name)
    if (user.password == loginData.password) {
      let usedTokens = getActiveTokens(this.userStore.users)
      let newToken = generateToken(usedTokens)
      this.userStore.saveToken(user.name!, newToken)
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
}

function getActiveTokens(userList: Array<User>) {
  return Array.from(
    userList,
    // TODO: Find a better way to only map if existant
    (x) => x.token || ''
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
