import Question from './questionTypes'
import PlayerInfo from './playerInfo'
import GameInfo from './gameInfo'
import { GameStage } from '~/types/enums/game/gameStage'

export default interface GameUpdate {
  gameInfo?: GameInfo
  question?: Question
  players?: PlayerInfo[]
}

export interface GameData extends GameUpdate {
  gameInfo: GameInfo
  question: Question
  players: PlayerInfo[]
}
