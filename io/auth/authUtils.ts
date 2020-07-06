import { UserDatabase } from '~/types/localInterfaces'
import { uid, suid } from 'rand-token'
import { AuthData, AuthToken } from '~/types/networking/auth'

export class AuthUtils {
  userData: UserDatabase

  constructor(userData: UserDatabase) {
    this.userData = userData
  }

  getTokenAndVerifyLoginData(loginData: AuthData): AuthToken {
    if (isValidLogin(this.userData, loginData)) {
      let usedTokens = Array.from(
        this.userData.userList,
        // TODO: Find a better way to only map if existant
        (x) => x.authToken || ''
      )
      return { token: generateToken(usedTokens) }
    } else {
      throw new Error('Invalid Login Data.')
    }
  }
}

function isValidLogin(userData: UserDatabase, loginData: AuthData): boolean {
  let isValid = false

  userData.userList.forEach((user) => {
    if (user.name != loginData.name) return
    if (user.password != loginData.password) return
    isValid = true
  })

  return isValid
}

function generateToken(usedTokens: Array<String>) {
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
