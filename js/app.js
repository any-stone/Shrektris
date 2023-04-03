import Game from "./game.js"
import View from "./view.js"

const element = document.querySelector("#root")

const game = new Game()
const view = new View(root, 320, 640, 20, 10)

window.game = game
window.view = view

view.renderPlayfield(game.playfield)
