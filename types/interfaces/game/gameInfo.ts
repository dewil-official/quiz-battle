import { GameStage } from '~/types/enums/game/gameStage'

export default interface GameInfo {
  gameStage: GameStage
  questionCount: number
  questionNr: number
}
