class Design {
  constructor(elem, options, helpers) {
    this.curElm = elem
    this.options = options || {}
    this.helpers = helpers || {}
    this.defaultStyles = {
      position: "absolute",
      zIndex: 0
    }

    if (helpers) {
      for (let index in helpers)
        this.curElm[index] = helpers[index]
    }
  }

  applyStyles() {
    for (let index in this.defaultStyles)
      this.curElm.style[index] = this.defaultStyles[index]
    for (let index in this.options)
      this.curElm.style[index] = this.options[index]
  }

  setOptions(options) {
    for (let index in options)
      this.options[index] = this.options[index]
  }

  render() {
    this.applyStyles()
  }

}

class Layer {
  constructor(elem, elemId, options) {
    this.curElm = elem
    this.elemId = elemId
    this.options = options || {}
    this.defaultStyles = {
      position: "absolute",
      left: "0px",
      top: "0px",
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      overflow: "hidden",
      zIndex: 0
    }
    this.curId = 0
    this.designs = {}
  }

  applyStyles() {
    for (let index in this.defaultStyles)
      this.curElm.style[index] = this.defaultStyles[index]
    for (let index in this.options)
      this.curElm.style[index] = this.options[index]
  }

  render() {
    this.applyStyles()
    for (let index in this.designs)
      this.designs[index].render()
  }

  getNewDesignId() {
    this.curId++
    return this.elemId + '-design-' + this.curId
  }

  removeDesign(designId) {
    delete (this.designs[designId])
  }

  createDesign(name, options, helpers) {
    let newElement = document.createElement("div")
    let newId = this.getNewDesignId()
    newElement.setAttribute("id", newId)

    if (this.curElm) {
      this.curElm.appendChild(newElement)
      this.designs[name] = new Design(newElement, options, helpers)
      return this.designs[name]
    } else {
      console.error("Error: Layer curElm is null.")
      return null
    }
  }
}

class Display {

  constructor(elemSelector, options) {
    this.elemSelector = elemSelector
    this.curElm = document.querySelector(this.elemSelector)
    this.layers = {}
    this.curId = 0
    this.options = options || {}
    this.defaultStyles = {
      position: "absolute",
      left: "0px",
      top: "0px",
      backgroundColor: "transparent",
      overflow: "hidden"
    }
  }

  getNewLayerId() {
    this.curId++
    return '#display-layer-' + this.curId
  }

  createLayer(name, options) {
    let newElement = document.createElement("div")
    let newId = this.getNewLayerId()
    newElement.setAttribute("id", newId)
    this.curElm.appendChild(newElement)
    this.layers[name] = new Layer(newElement, newId, options)
    return this.layers[name]
  }

  removeLayer(layerId) {
    delete (this.layers[layerId])
  }

  applyStyles() {
    for (let index in this.defaultStyles)
      this.curElm.style[index] = this.defaultStyles[index]
    for (let index in this.options)
      this.curElm.style[index] = this.options[index]
  }

  render() {
    this.applyStyles()
    for (let index in this.layers) {
      this.layers[index].render()
    }
  }
}

const l1_block = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: -1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: -1 }
  ]
]

const l2_block = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: -1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: -1 }
  ]
]

const square_block = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 }
  ]
]

const z1_block = [
  [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 }
  ],
]

const z2_block = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
  ],
]

const t_block = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: -1, y: 0 }
  ],
  [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 }
  ]
]

const line_block = [
  [
    { x: 0, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: -2 },
    { x: 0, y: 1 }
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: -1, y: 0 }
  ],
]

const figures = [
  line_block,
  t_block,
  z2_block,
  z1_block,
  square_block,
  l2_block,
  l1_block
]

const colors = [
  { main: '#3f3', border: '#090' },
  { main: '#f33', border: '#900' },
  { main: '#33f', border: '#009' },
  { main: '#e3e', border: '#606' },
  { main: '#3ee', border: '#066' },
  { main: '#ee3', border: '#660' },
]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomPiece() {
  let index = getRandomInt(0, figures.length - 1)
  return figures[index]
}

class Piece {
  constructor(positionsMap, curPieceNumber, layer, blockSize, startTop, startLeft, colors) {
    this.positionsMap = positionsMap
    this.curFlip = 0
    this.layer = layer
    this.curPieceNumber = curPieceNumber
    this.blockSize = blockSize
    this.left = startLeft
    this.top = startTop
    this.designs = []
    this.createDesigns(colors)
    this.maxX = 15
    this.maxY = 20
  }

  createDesigns(colors) {
    for (let index in this.positionsMap[0]) {
      let left = this.calcDesignLeft(0, index, this.left)
      let top = this.calcDesignTop(0, index, this.top)

      this.designs[index] = this.layer.createDesign(`figure-${this.curPieceNumber}-${index}`, {
        backgroundColor: colors.main,
        boxSizing: "border-box",
        border: "2px solid " + colors.border,
        width: this.blockSize + "px",
        height: this.blockSize + "px",
        top: top + "px",
        left: left + "px",
        transition: "all 0.2s ease-out",
        opacity: 1,
        borderRadius: "px"
      })
    }
  }


  recalcPositions(flip, curLeft, curTop) {
    let newCoords = []
    for (let index in this.designs) {
      let left = this.calcDesignLeft(flip, index, curLeft)
      let top = this.calcDesignTop(flip, index, curTop)
      newCoords[index] = { x: left, y: top }
    }
    return newCoords
  }

  compareDesignsPositions(x, y, freezedDesigns) {
    for (let index in freezedDesigns) {
      let design = freezedDesigns[index]
      if ((x == parseInt(design.curElm.style.left)) & (y == parseInt(design.curElm.style.top)))
        return true
    }
    return false
  }

  checkPositions(newCoords, freezedDesigns) {
    for (let index in newCoords) {
      if (newCoords[index].x >= (this.maxX * this.blockSize))
        return false
      if (newCoords[index].x < 0)
        return false
      if (newCoords[index].y >= (this.maxY * this.blockSize))
        return false
      if (this.compareDesignsPositions(newCoords[index].x, newCoords[index].y, freezedDesigns))
        return false
    }
    return true
  }

  applyPositions(newCoords) {
    for (let index in newCoords) {
      this.designs[index].options.left = newCoords[index].x + "px"
      this.designs[index].options.top = newCoords[index].y + "px"
    }
  }

  flip(freezedDesigns) {
    let tmpFlip = this.curFlip + 1
    if (tmpFlip >= this.positionsMap.length) {
      tmpFlip = 0
    }

    let newCoords = this.recalcPositions(tmpFlip, this.left, this.top)
    if (this.checkPositions(newCoords, freezedDesigns)) {
      this.curFlip = tmpFlip
      this.applyPositions(newCoords)
      this.layer.render()
    }
  }

  moveY(yIncrement, freezedDesigns) {
    let tmpTop = this.top + yIncrement * this.blockSize
    let newCoords = this.recalcPositions(this.curFlip, this.left, tmpTop)

    if (this.checkPositions(newCoords, freezedDesigns)) {
      this.top = tmpTop
      this.applyPositions(newCoords)
      this.layer.render()
    } else
      return false

    return true
  }

  moveX(xIncrement, freezedDesigns) {
    let tmpLeft = this.left + xIncrement * this.blockSize
    let newCoords = this.recalcPositions(this.curFlip, tmpLeft, this.top)

    if (this.checkPositions(newCoords, freezedDesigns)) {
      this.left = tmpLeft
      this.applyPositions(newCoords)
      this.layer.render()
    }
  }

  calcDesignLeft(mapId, designId, curLeft) {
    let obj = this.positionsMap[mapId]
    return curLeft + obj[designId].x * this.blockSize
  }

  calcDesignTop(mapId, designId, curTop) {
    let obj = this.positionsMap[mapId]
    return curTop + obj[designId].y * this.blockSize
  }

}

class Application {
  constructor(width, height, blockSize) {
    this.tetrisWidth = width || 15
    this.tetrisHeight = height || 20
    this.blockSize = blockSize || 30

    this.display = new Display("#display", {
      width: "450px",
      height: "600px;"
    })
    this.display.createLayer("back", {
      background: "#222",
      zIndex: 0
    })
    this.display.createLayer("front", {
      background: "#333",
      zIndex: 1
    })

    this.display.render()
    this.curPiece = null
    this.curRound = 0
    this.calculateInterval = null
    let self = this
    document.onkeydown = function (e) {
      self.keyEvents(e)
    }
    this.freezedDesigns = {}
    this.freezeIndex = 0
    this.removePoll = {}
    this.paused = false
    this.score = 0

    this.createGameContainer()

    const resetButton = document.querySelector("#reset")
    resetButton.addEventListener("click", () => this.reset())
  }

  keyEvents(e) {
    switch (e.keyCode) {
      case 38: this.curPiece.flip(this.freezedDesigns)
        break

      case 37: this.curPiece.moveX(-1, this.freezedDesigns)
        break

      case 39: this.curPiece.moveX(1, this.freezedDesigns)
        break

      case 40: this.tick()
        break

      case 27: this.pause()
        break
    }
  }

  calcSpeed(curRound) {
    let dicrement = 700 - curRound * 5
    if (dicrement < 0) dicrement = 0
    return 300 + dicrement
  }

  pause() {
    if (this.isGameOver()) {
      return
    }
    if (!this.paused) {
      this.paused = true
      clearInterval(this.calculateInterval)
      document.querySelector('#menu3').style.opacity = 1
    } else {
      this.paused = false
      document.querySelector('#menu3').style.opacity = 0
      this.calculateInterval = setInterval(() => {
        this.tick()
      }, this.calcSpeed(this.curRound))
    }
  }

  startRound() {
    this.curRound++
    document.querySelector("#speed").innerHTML = 1000 - this.calcSpeed(this.curRound)

    const startLeft = parseInt(this.tetrisWidth / 2) * 30
    const startTop = 30
    const color = colors[getRandomInt(0, colors.length - 1)]

    this.curPiece = new Piece(getRandomPiece(), this.curRound, this.display.layers.front, this.blockSize, startTop, startLeft, color)

    clearInterval(this.calculateInterval)
    this.calculateInterval = setInterval(() => {
      this.tick()
    }, this.calcSpeed(this.curRound))
    this.display.render()
  }

  recalculateYPosition(obj) {
    let curTop = parseInt(obj.curElm.style.top) || 0
    return curTop + this.blockSize
  }

  moveToFreezed(curPiece) {
    for (let index in curPiece.designs) {
      this.freezedDesigns[this.freezeIndex] = curPiece.designs[index]
      this.freezeIndex++
    }
  }

  isGameOver() {
    const startLeft = parseInt(this.tetrisWidth / 2) * 30
    const startTop = 60

    for (let index in this.freezedDesigns) {
      let design = this.freezedDesigns[index]
      if ((parseInt(design.curElm.style.top) <= startTop) & (parseInt(design.curElm.style.left) == startLeft))
        return true
    }
    return false
  }

  calcMapPositionX(freezedDesign) {
    return parseInt(parseInt(freezedDesign.curElm.style.left) / this.blockSize)
  }

  calcMapPositionY(freezedDesign) {
    return parseInt(parseInt(freezedDesign.curElm.style.top) / this.blockSize)
  }

  checkLine(line) {
    for (let item of line)
      if (item == null)
        return false
    return true
  }

  startRemove(dropLines) {
    for (let index in this.removePoll) {
      this.removePoll[index].options.opacity = 0
    }
    this.display.layers.front.render()
    setTimeout(() => this.moveDown(dropLines), 300)
  }

  checkScoreAndDisplayMessage() {
    if (this.score >= 15) {
      document.querySelector("#menu7").style.opacity = 1
    }
  }

  moveDown(dropLines) {
    let score = dropLines.length * dropLines.length * this.curRound
    let curScore = parseInt(document.querySelector("#score").innerHTML)
    this.score = curScore + score
    document.querySelector("#score").innerHTML = this.score

    this.checkScoreAndDisplayMessage()

    let linesMap = this.createLinesMap()

    for (let line of dropLines)
      for (let y = line; y > 0; y--)
        for (let x = 0; x < this.tetrisWidth; x++) {
          let tmpIndex = linesMap[y - 1][x]
          if (tmpIndex != null) {
            linesMap[y][x] = linesMap[y - 1][x]
            linesMap[y - 1][x] = null
            let tmpY = parseInt(this.freezedDesigns[tmpIndex].options.top)
            this.freezedDesigns[tmpIndex].options.top = tmpY + this.blockSize + "px"
          }
        }

    this.display.layers.front.render();

    setTimeout(() => {
      for (let index in this.removePoll) {
        this.removePoll[index].curElm.remove();
      }
      this.removePoll = {}
    }, 300)
  }

  createLinesMap() {
    let linesMap = []
    for (let y = 1; y <= this.tetrisHeight; y++) {
      let emptyLine = []
      for (let x = 0; x < this.tetrisWidth; x++)
        emptyLine.push(null)
      linesMap.push(emptyLine)
    }
    for (let index in this.freezedDesigns) {
      let x = this.calcMapPositionX(this.freezedDesigns[index])
      let y = this.calcMapPositionY(this.freezedDesigns[index])
      linesMap[y][x] = index
    }
    return linesMap
  }

  checkForDropLines() {
    let linesMap = this.createLinesMap()
    let dropLines = []

    for (let index in linesMap) {
      if (this.checkLine(linesMap[index])) {
        dropLines.push(index)
        this.moveToRemovePool(linesMap[index])
      }
    }
    return dropLines
  }

  moveToRemovePool(itemsArray) {
    for (let index of itemsArray) {
      this.removePoll[index] = this.freezedDesigns[index]
      delete (this.freezedDesigns[index])
    }
  }

  tick() {
    if (this.paused) {
      return
    }
    if (!this.curPiece.moveY(1, this.freezedDesigns)) {
      this.moveToFreezed(this.curPiece)
      let dropLines = this.checkForDropLines()
      if (dropLines.length > 0) {
        this.startRemove(dropLines)
      }

      if (this.isGameOver()) {
        clearInterval(this.calculateInterval)
        document.querySelector("#menu6").style.opacity = 1
      } else {
        this.startRound()
      }
    }
  }

  createGameContainer() {
    const gameContainer = document.createElement("div")
    gameContainer.id = "game-container"
    document.body.appendChild(gameContainer)
  }

  reset() {
    this.freezeIndex = 0
    this.removePoll = {}
    this.score = 0
    this.curRound = 0
    document.querySelector("#score").innerHTML = this.score
    document.querySelector("#menu6").style.opacity = 0
    document.querySelector("#menu7").style.opacity = 0
    clearInterval(this.calculateInterval)

    if (this.paused) {
      this.paused = false
      document.querySelector('#menu3').style.opacity = 0
      this.calculateInterval = setInterval(() => {
        this.tick()
      }, this.calcSpeed(this.curRound))
    }

    if (this.curPiece) {
      for (let key in this.curPiece.designs) {
        this.curPiece.designs[key].options.opacity = 0
      }
    }

    for (let key in this.freezedDesigns) {
      this.freezedDesigns[key].options.opacity = 0
      this.display.layers.front.removeDesign(key)
    }

    this.freezedDesigns = {}
    this.display.render()
    this.startRound()
  }
}

document.addEventListener("keydown", function (e) {

  if (e.key === "Enter" && !window.app) {
    document.querySelector("#menu5").style.opacity = 0
    window.app = new Application()
    app.startRound()
  }
})

