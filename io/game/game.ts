import GameUpdate, { GameData } from '~/types/interfaces/game/gameUpdate'
import AuthUtils from '../auth/authUtils'
import { JokerTypes } from '../../types/enums/game/jokerTypes'
import PlayerInfo from '~/types/interfaces/game/playerInfo'
import { testGameState } from '../../data/gameState'
import { testQuestionDB } from '../../data/questionDB'
import Question from '../../types/interfaces/game/questionTypes'
import ApprovedAnswers, {
  AnswerApproval,
} from '~/types/interfaces/master/approvedAnswers'
import { QuestionResults } from '~/types/interfaces/game/gameInfo'
import { GameStage } from '../../types/enums/game/gameStage'

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

  applyQuestionResults(approvals: ApprovedAnswers) {
    // 1. Convert 'approvals' to 'questionResults' in GameInfo.
    //   - for each user: save the old store.
    //   - for each user: calc the score, and apply it.
    let questionResults: QuestionResults = []
    approvals.forEach((userApproval: AnswerApproval) => {
      console.log('Seaching for user:', userApproval.name)
      let user = this.authUtils.userStore.getUserByName(userApproval.name)
      questionResults.push({
        name: userApproval.name,
        oldScore: user.gameData.score,
        usedJoker: user.gameData.activeJoker,
        isCorrect: userApproval.isCorrect,
      })
      let userIndex = this.authUtils.userStore.users.findIndex((user) => {
        return user.authData.name == userApproval.name
      })
      let jokerIndex = this.authUtils.userStore.users[
        userIndex
      ].gameData.jokers.findIndex((joker) => {
        joker == user.gameData.activeJoker
      })
      // Apply the changes to the DB
      this.authUtils.userStore.users[userIndex].gameData.score = this.calcScore(
        user.gameData.score,
        userApproval.isCorrect,
        user.gameData.activeJoker == JokerTypes.x3 ? true : false
      )
      this.authUtils.userStore.users[userIndex].gameData.activeJoker = null
      this.authUtils.userStore.users[userIndex].gameData.jokers.splice(
        jokerIndex,
        1
      )
      this.authUtils.userStore.users[userIndex].gameData.answer = ''
      this.authUtils.userStore.users[userIndex].gameData.isDone = false
    })
    // 2. Forward the game to questionResults stage.
    this.gameState.gameInfo.gameStage = GameStage.questionResults
    this.gameState.question.showAnswer = true
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

  private calcScore(
    oldScore: number,
    isCorrect: boolean,
    hasX3Joker: boolean
  ): number {
    if (!isCorrect) return oldScore
    if (hasX3Joker) return oldScore + 3
    return oldScore + 1
  }
}
