export interface User {
  socketId?: String
  name: String
  password: String
  isAdmin: boolean
  authToken?: String
}
