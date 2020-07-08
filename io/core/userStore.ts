import UserDatabase from '~/types/user/userDatabase'
import User from '~/types/user/user'

export default class UserStore {
  users: Array<User>

  constructor(userStore: UserDatabase) {
    this.assertUniqueUsernames(userStore.users)
    this.users = userStore.users
  }

  getUserByName(name: string): User {
    let foundUser: User = {}
    this.users.forEach((user) => {
      if (user.name == name) foundUser = user
    })
    if (foundUser != {}) {
      return foundUser
    } else {
      throw Error('User not found.')
    }
  }

  saveToken(name: string, token: string) {
    let usersIndex = this.users.findIndex((u) => u.name == name)
    let user = this.users[usersIndex]
    user.token = token
    this.users[usersIndex] = user
  }

  assertUniqueUsernames(users: Array<User>) {
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
}
