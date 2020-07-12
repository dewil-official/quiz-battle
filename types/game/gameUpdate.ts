import Question from './question'
import Scoreboard from './scoreboard'

export default interface GameUpdate {
  question?: Question
  scoreboard?: Scoreboard
}
