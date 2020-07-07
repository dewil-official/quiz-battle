export default class Game {
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
