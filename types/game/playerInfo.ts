import { JokerTypes } from './jokerTypes'

export default interface PlayerInfo {
  name: string
  score: number
  jokers: JokerTypes[]
  activeJoker: JokerTypes | null
  answer: string
  isDone: boolean
}
