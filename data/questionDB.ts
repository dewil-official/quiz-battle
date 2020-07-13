import Question, {
  QuestionType,
  NormalQuestion,
  ChoiceQuestion,
  GuessQuestion,
  MediaQuestion,
  MediaType,
} from '../types/interfaces/game/questionTypes'

export const testQuestionDB: Array<
  NormalQuestion | ChoiceQuestion | GuessQuestion | MediaQuestion
> = [
  {
    text: 'Text Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.normal,
    showAnswer: false,
  },
  {
    text: 'Choice Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.choice,
    showAnswer: false,
    choices: ['First', 'Second', 'Third', 'Fourth'],
  },
  {
    text: 'Guess Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.guess,
    showAnswer: false,
    guessRange: {
      start: 0,
      stop: 900,
    },
  },
  {
    text: 'Image Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.media,
    showAnswer: false,
    mediaType: MediaType.image,
    mediaUrl: 'https://unsplash.com/photos/dfbrZ0twX_E/download?force=true',
  },
  {
    text: 'Video Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.media,
    showAnswer: false,
    mediaType: MediaType.youtube,
    mediaUrl: 'https://www.youtube.com/embed/Bey4XXJAqS8',
  },
  {
    text: 'Image Choice Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.media,
    showAnswer: false,
    mediaType: MediaType.image,
    mediaUrl: 'https://unsplash.com/photos/dfbrZ0twX_E/download?force=true',
    choices: ['First', 'Second'],
  },
  {
    text: 'Video Choice Question',
    correctAnswer: 'Texxxt',
    type: QuestionType.media,
    showAnswer: false,
    mediaType: MediaType.youtube,
    mediaUrl: 'https://www.youtube.com/embed/Bey4XXJAqS8',
    choices: ['First', 'Second', '3rd', '4th', '5th', '6st'],
  },
]
