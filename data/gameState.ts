import GameUpdate, { GameData } from '../types/interfaces/game/gameUpdate'
import { GameStage } from '../types/enums/game/gameStage'
import { QuestionType } from '../types/interfaces/game/questionTypes'
import { JokerTypes } from '../types/enums/game/jokerTypes'

export const testGameState: GameData = {
  gameInfo: {
    gameStage: GameStage.answerEvaluation,
    questionCount: 0,
    questionNr: 0,
  },
  question: {
    text: 'Example Question?',
    correctAnswer: 'Answer...',
    type: QuestionType.normal,
    showAnswer: false,
  },
  players: [
    {
      name: 'Ceddy',
      score: 999,
      jokers: [JokerTypes.spy, JokerTypes.spy, JokerTypes.hint, JokerTypes.x3],
      activeJoker: null,
      answer: 'Lol.',
      isDone: false,
    },
    {
      name: 'Felix',
      score: 12,
      jokers: [JokerTypes.x3],
      activeJoker: null,
      answer: 'Texxxt.',
      isDone: true,
    },
  ],
}
