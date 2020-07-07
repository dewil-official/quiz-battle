import { uid, suid } from 'rand-token'

export default class AuthUtils {
  constructor(userDb) {
    this.userDb = userDb
  }

  loginUser(authData) {
    if (isValidPassword(this.userDb, authData)) {
      let usedTokens = getActiveTokens(this.userDb.userList)
      let newToken = generateToken(usedTokens)
      this.userDb = saveToken(newToken, authData.name, this.userDb)
      return newToken
    } else {
      throw new Error('Invalid Login Data.')
    }
  }

  isValidToken(authToken) {
    let activeTokens = getActiveTokens(this.userDb.userList)
    if (activeTokens.includes(authToken)) {
      return true
    } else {
      return false
    }
  }
}

function getActiveTokens(userList) {
  return Array.from(
    userList,
    // TODO: Find a better way to only map if existant
    (x) => x.authToken || ''
  )
}

function isValidPassword(userDb, authData) {
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

function saveToken(newToken, userName, userDb) {
  console.log(`
newToken: ${newToken}
userName: ${userName}
userDb: ${userDb}
  `)
  let userList = userDb.userList
  for (user in userList) {
    if (user.name == userName) {
      user.token = newToken
      break
    }
  }
  return { ...userDb, userList: userList }
}
