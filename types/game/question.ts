export default interface Question {
  text: string
  category: string
  correctAnswer: string
}

export interface NormalQuestion extends Question {
  // This is just a nicer naming for the Question
  // interface atm. But there might be additional stuff
}

export interface ChoiceQuestion extends Question {
  choices: string[]
}

export interface GuessQuestion extends Question {
  guessRange: { start: number; stop: number }
}

export interface MediaQuestion extends Question {
  mediaType: MediaType
  mediaUrl: string
  choices?: string[]
}

export enum MediaType {
  audio,
  image,
  youtube,
}
