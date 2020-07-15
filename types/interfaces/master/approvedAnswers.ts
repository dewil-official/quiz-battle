export default interface ApprovedAnswers extends Array<AnswerApproval> {}

export interface AnswerApproval {
  name: string
  isCorrect: boolean
}
