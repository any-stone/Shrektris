export default class Controller {
  constructor(game, view) {
    this.game = game
    this.view = view

    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.view.renderStartScreen
      
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
        this.view.renderMainScreen(this.game.getState())
      case "ArrowLeft":
        this.game.movePieceLeft()
        this.view.renderMainScreen(game.getState())
        break
      case "ArrowUp": 
        this.game.rotatePiece()
        this.view.renderMainScreen(game.getState())
        break
      case "ArrowRight": 
        this.game.movePieceRight()
        this.view.renderMainScreen(game.getState())
        break
      case "ArrowDown":
        this.game.movePieceDown()
        this.view.render(game.getState())
        break
    }
  }
}