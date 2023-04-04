export default class Controller {
  constructor(game, view) {
    this.game = game
    this.view = view

    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.view.renderStartScreen
      
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowLeft":
        game.movePieceLeft()
        view.render(game.getState())
        break
      case "ArrowUp": 
        game.rotatePiece()
        view.render(game.getState())
        break
      case "ArrowRight": 
        game.movePieceRight()
        view.render(game.getState())
        break
      case "ArrowDown":
        game.movePieceDown()
        view.render(game.getState())
        break
    }
  }
}