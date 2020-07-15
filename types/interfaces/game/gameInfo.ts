import { GameStage } from '~/types/enums/game/gameStage'
import { JokerTypes } from '~/types/enums/game/jokerTypes'

export default interface GameInfo {
  gameStage: GameStage
  questionCount: number
  questionNr: number
  questionResults?: QuestionResults
}

export interface QuestionResults extends Array<QuestionResult> {}

export interface QuestionResult {
  name: string
  oldScore: number // Used to calc the difference
  isCorrect: boolean
  usedJoker: JokerTypes | null
}
