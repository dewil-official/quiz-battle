import { UserAuthData } from '../concepts/user'

export default interface UserDatabase {
  users: Array<UserAuthData>
}
