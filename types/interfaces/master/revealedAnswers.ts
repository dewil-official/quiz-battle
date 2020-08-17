export default interface RevealedAnswers extends Array<AnswerApproval> {}

export interface AnswerReveal {
  name: string
  isRevealed: boolean
}
