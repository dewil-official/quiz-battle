import User from '../user/user'

export default interface Scoreboard {
  scores: Array<UserScore>
}

export interface UserScore {
  user: User
  score: number
}
