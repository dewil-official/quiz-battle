import UserDatabase from '~/types/user/userDatabase'
import { User, UserAuthData } from '../../types/core/user'

export default class UserStore {
  users: Array<User>

  constructor(database: UserDatabase) {
    this.assertUniqueUsernames(database.users)
    this.users = this.mapDatabaseToUsers(database)
  }

  getUserByName(name: string): User {
    let foundUser: User | null = null
    this.users.forEach((user) => {
      if (user.authData.name == name) foundUser = user
    })
    if (foundUser != null) {
      return foundUser
    } else {
      throw Error('User not found.')
    }
  }

  saveToken(name: string, token: string) {
    let usersIndex = this.users.findIndex((u) => u.authData.name == name)
    let user = this.users[usersIndex]
    user.authData.token = token
    this.users[usersIndex] = user
  }

  removeUser(token: string) {
    let userIndex = this.users.findIndex((u) => u.authData.token == token)
    this.users[userIndex].authData.token = undefined
    this.users[userIndex].connectionData.socketId = null
  }

  // Methods for Initializing the UserStore

  assertUniqueUsernames(users: Array<UserAuthData>) {
    let userNames: Array<string | undefined> = users.map((user) => {
      return user.name
    })
    userNames = userNames.filter((name) => {
      if (name) return true
      else return false
    })
    if (userNames.length !== new Set(userNames).size) {
      throw Error("Duplicate Usernames aren't allowed!")
    }
  }

  mapDatabaseToUsers(db: UserDatabase): Array<User> {
    return db.users.map((userAuthData) => {
      return new User(userAuthData)
    })
  }
}
