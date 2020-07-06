import { uid, suid } from 'rand-token'

export default class AuthUtils {
  constructor(userDb) {
    this.userDb = userDb
  }

  loginUser(authData) {
    if (isValidLogin(this.userDb, authData)) {
      let usedTokens = Array.from(
        this.userDb.userList,
        // TODO: Find a better way to only map if existant
        (x) => x.authToken || ''
      )
      return generateToken(usedTokens)
    } else {
      throw new Error('Invalid Login Data.')
    }
  }
}

function isValidLogin(userDb, authData) {
  let isValid = false

  userDb.userList.forEach((user) => {
    if (user.name != authData.name) return
    if (user.password != authData.password) return
    isValid = true
  })

  return isValid
}

function generateToken(usedTokens) {
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
