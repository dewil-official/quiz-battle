import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Question, {
  QuestionType,
  ChoiceQuestion,
  NormalQuestion,
  GuessQuestion,
  MediaQuestion,
  MediaType,
} from '~/types/interfaces/game/questionTypes'
import GameUpdate from '~/types/interfaces/game/gameUpdate'
import PlayerInfo from '~/types/interfaces/game/playerInfo'
import { JokerTypes } from '~/types/enums/game/jokerTypes'

@Module({ stateFactory: true })
// This store is received by all players, but different versions each
// It depends on their permission leven and whether they have
// activated a Joker that allows them to see other answers for example.
export default class GameStore extends VuexModule {
  players: PlayerInfo[] = [
    {
      name: 'David',
      score: 2,
      jokers: [JokerTypes.x3, JokerTypes.spy, JokerTypes.spy, JokerTypes.hint],
      activeJoker: JokerTypes.x3,
      answer: 'The best ga',
      isDone: false,
    },
    {
      name: 'Dobrik',
      score: 0,
      jokers: [],
      activeJoker: null,
      isDone: true,
      answer:
        'The least favorite game. I cannot even describe it, not even in the second line or the third!',
    },
  ]
  question: NormalQuestion | ChoiceQuestion | GuessQuestion | MediaQuestion = {
    text: 'What is the Question?',
    correctAnswer: 'Choice D',
    type: QuestionType.normal,
    showAnswer: false,
    mediaType: MediaType.youtube,
    mediaUrl: 'https://www.youtube.com/embed/mln2SymT73s',
  }

  @Mutation
  UPDATE_SCOREBOARD() {}

  @Mutation
  UPDATE_QUESTION() {}

  @Action
  SOCKET_GAME_UPDATE(gameUpdate: GameUpdate) {
    if (gameUpdate.question) {
      this.context.commit('UPDATE_QUESTION', gameUpdate.question)
    }
  }
}
