export interface User {
  socketId?: string
  name: string
  password: string
  isAdmin: boolean
  authToken?: string
}
