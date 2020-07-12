export enum GameStage {
  waiting, // When people are still joining
  intro, // Short tutorial screen / Master can make some settings
  question, // Players can type / select the answer
  answerEvaluation, // Answers are locked and the right answers are picked (auto if possible)
  questionResults, // The results are shown to the users
  paused, // Game is paused and the Score screen is shown
  end, // Final screen with the results
}
