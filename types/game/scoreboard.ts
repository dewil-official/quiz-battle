import UserOld from '../user/user'

export default interface Scoreboard {
  scores: Array<UserScore>
}

export interface UserScore {
  user: UserOld
  score: number
}
