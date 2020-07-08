export default class Game {
  scoreboard: Array<Object>
  question: Object

  constructor() {
    this.scoreboard = []
    this.question = {
      type: 'TEXT',
      category: 'EXAMPLE',
      text: '',
      correctAnswer: '',
    }
  }

  getGameData() {
    return {
      scoreboard: this.scoreboard,
      question: this.question,
    }
  }
}
