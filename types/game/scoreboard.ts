import UserOld from '../user/userOld'

export default interface Scoreboard {
  scores: Array<UserScore>
}

export interface UserScore {
  user: UserOld
  score: number
}
