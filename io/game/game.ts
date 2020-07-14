import GameUpdate, { GameData } from '~/types/interfaces/game/gameUpdate'
import AuthUtils from '../auth/authUtils'
import { JokerTypes } from '../../types/enums/game/jokerTypes'
import PlayerInfo from '~/types/interfaces/game/playerInfo'
import { testGameState } from '../../data/gameState'
import { testQuestionDB } from '../../data/questionDB'
import Question from '../../types/interfaces/game/questionTypes'

export default class Game {
  gameState: GameData
  authUtils: AuthUtils
  questionDB: Array<Question> = testQuestionDB

  constructor(authUtils: AuthUtils) {
    this.authUtils = authUtils
    this.gameState = testGameState
    this.gameState.gameInfo!.questionCount = this.questionDB.length
    this.loadQuestion()
  }

  getGameUpdateForUser(token: string): GameUpdate {
    let isAdmin = this.authUtils.isAdmin(token)
    let gameUpdate: GameUpdate = {}

    gameUpdate.gameInfo = this.gameState.gameInfo
    gameUpdate.players = this.getPlayers(isAdmin, token)
    gameUpdate.question = this.getQuestion(isAdmin)

    return gameUpdate
  }

  lastQuestion() {
    if (this.gameState.gameInfo.questionNr > 0) {
      this.gameState.gameInfo.questionNr--
      this.loadQuestion()
    }
  }

  nextQuestion() {
    if (
      this.gameState.gameInfo.questionCount >
      this.gameState.gameInfo.questionNr + 1
    ) {
      this.gameState.gameInfo.questionNr++
      this.loadQuestion()
    }
  }

  private loadQuestion() {
    this.gameState.question = this.questionDB[
      this.gameState.gameInfo.questionNr
    ]
  }

  private getQuestion(isAdmin: boolean) {
    if (isAdmin) return this.gameState.question!
    else {
      let question = this.gameState.question!
      if (!question.showAnswer) {
        question.correctAnswer = null
      }
      return question
    }
    throw Error("Couldn't get question data.")
  }

  private getPlayers(isAdmin: boolean, token: string): PlayerInfo[] {
    let playerList: PlayerInfo[]
    let ownInfo: PlayerInfo | undefined
    // The 'Spy' joker allows to see other people's answers
    let hasSpyJoker = false
    if (!isAdmin) {
      let userName = this.authUtils.getName(token)
      let playerInfo = this.gameState.players?.find((player) => {
        player.name == userName
      })
      if (playerInfo?.activeJoker == JokerTypes.spy) hasSpyJoker = true
      ownInfo = playerInfo
    }
    // Assign the list
    if (hasSpyJoker) {
      playerList = this.gameState.players.map((player) => {
        return {
          name: player.name,
          score: player.score,
          answer: player.answer,
        }
      })
    } else if (isAdmin) {
      playerList = this.gameState.players
    } else {
      playerList = this.gameState.players.map((player) => {
        return {
          name: player.name,
          score: player.score,
        }
      })
    }
    if (ownInfo) {
      let playerIndex = playerList.findIndex((player) => {
        player.name == ownInfo!.name
      })
      playerList[playerIndex] = ownInfo
    }
    return playerList
  }
}
