class Sprite {
  constructor(element, options, helpers) {
    this.curElement = element
    this.options = options || {}
    this.helpers = helpers || {}
    this.defaultStyles = {
      position: "absolute",
      zIndex: 0
    }

    if (helpers) {
      for (let index in helpers)
        this.curElement[index] = helpers[index]
    }
  }

  applyStyles() {
    for (let index in this.defaultStyles)
      this.curElement.style[index] = this.defaultStyles[index]
    for (let index in this.options)
      this.curElement.style[index] = this.options[index]
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
  constructor(element, elementId, options) {
    this.curElement = element
    this.elementId = elementId
    this.options = options || {}
    this.defaultStyles = {
      position: 'absolute',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      overflow: 'hidden',
      zIndex: 0
    }
    this.curId = 0
    this.sprites = {}
  }

  applyStyles() {
    for (let index in this.defaultStyles)
      this.curElement.style[index] = this.defaultStyles[index]
    for (let index in this.options)
      this.curElement.style[index] = this.options[index]
  }

  render() {
    this.applyStyles()
    for (let index in this.sprites)
      this.sprites[index].render()
  }

  getNewSpriteId() {
    this.curId++
    return this.elementId + '-sprite-' + this.curId
  }

  removeSprite(spriteId) {
    delete (this.sprites[spriteId])
  }

  createSprite(name, options, helpers) {
    let newElement = document.createElement("div")
    let newId = this.getNewSpriteId()
    newElement.setAttribute("id", newId)

    if (this.curElement) {
      this.curElement.appendChild(newElement)
      this.sprites[name] = new Sprite(newElement, options, helpers)
      return this.sprites[name]
    } else {
      console.error("Error: Layer curElement is null.")
      return null
    }
  }
}

class Display {

  constructor(elementSelector, options) {
    this.elementSelector = elementSelector
    this.curElement = document.querySelector(this.elementSelector)
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
    this.curElement.appendChild(newElement)
    this.layers[name] = new Layer(newElement, newId, options)
    return this.layers[name]
  }

  removeLayer(layerId) {
    delete (this.layers[layerId])
  }

  applyStyles() {
    for (let index in this.defaultStyles)
      this.curElement.style[index] = this.defaultStyles[index]
    for (let index in this.options)
      this.curElement.style[index] = this.options[index]
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

function getRandomFigure() {
  let index = getRandomInt(0, figures.length - 1)
  return figures[index]
}

class Figure {
  constructor(positionsMap, curFigureNumber, layer, blockSize, startTop, startLeft, colors) {
    this.positionsMap = positionsMap
    this.curFlip = 0
    this.layer = layer
    this.curFigureNumber = curFigureNumber
    this.blockSize = blockSize
    this.left = startLeft
    this.top = startTop
    this.sprites = []
    this.createSprites(colors)
    this.maxX = 15
    this.maxY = 20
  }

  createSprites(colors) {
    for (let index in this.positionsMap[0]) {
      let left = this.calcSpriteLeft(0, index, this.left)
      let top = this.calcSpriteTop(0, index, this.top)

      this.sprites[index] = this.layer.createSprite(`figure-${this.curFigureNumber}-${index}`, {
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
    for (let index in this.sprites) {
      let left = this.calcSpriteLeft(flip, index, curLeft)
      let top = this.calcSpriteTop(flip, index, curTop)
      newCoords[index] = { x: left, y: top }
    }
    return newCoords
  }

  compareSpritesPositions(x, y, freezedSprites) {
    for (let index in freezedSprites) {
      let sprite = freezedSprites[index]
      if ((x == parseInt(sprite.curElement.style.left)) & (y == parseInt(sprite.curElement.style.top)))
        return true
    }
    return false
  }

  checkPositions(newCoords, freezedSprites) {
    for (let index in newCoords) {
      if (newCoords[index].x >= (this.maxX * this.blockSize))
        return false
      if (newCoords[index].x < 0)
        return false
      if (newCoords[index].y >= (this.maxY * this.blockSize))
        return false
      if (this.compareSpritesPositions(newCoords[index].x, newCoords[index].y, freezedSprites))
        return false
    }
    return true
  }

  applyPositions(newCoords) {
    for (let index in newCoords) {
      this.sprites[index].options.left = newCoords[index].x + "px"
      this.sprites[index].options.top = newCoords[index].y + "px"
    }
  }

  flip(freezedSprites) {
    let tmpFlip = this.curFlip + 1
    if (tmpFlip >= this.positionsMap.length)
      tmpFlip = 0

    let newCoords = this.recalcPositions(tmpFlip, this.left, this.top)
    if (this.checkPositions(newCoords, freezedSprites)) {
      this.curFlip = tmpFlip
      this.applyPositions(newCoords)
      this.layer.render()
    }
  }

  moveY(yIncrement, freezedSprites) {
    let tmpTop = this.top + yIncrement * this.blockSize
    let newCoords = this.recalcPositions(this.curFlip, this.left, tmpTop)

    if (this.checkPositions(newCoords, freezedSprites)) {
      this.top = tmpTop
      this.applyPositions(newCoords)
      this.layer.render()
    } else
      return false

    return true
  }

  moveX(xIncrement, freezedSprites) {
    let tmpLeft = this.left + xIncrement * this.blockSize
    let newCoords = this.recalcPositions(this.curFlip, tmpLeft, this.top)

    if (this.checkPositions(newCoords, freezedSprites)) {
      this.left = tmpLeft
      this.applyPositions(newCoords)
      this.layer.render()
    }
  }

  calcSpriteLeft(mapId, spriteId, curLeft) {
    let obj = this.positionsMap[mapId]
    return curLeft + obj[spriteId].x * this.blockSize
  }

  calcSpriteTop(mapId, spriteId, curTop) {
    let obj = this.positionsMap[mapId]
    return curTop + obj[spriteId].y * this.blockSize
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
    this.curFigure = null
    this.curRaund = 0
    this.calculateInterval = null
    let self = this
    document.onkeydown = function (e) {
      self.keyEvents(e)
    }
    this.freezedSprites = {}
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
      case 38: this.curFigure.flip(this.freezedSprites)
        break

      case 37: this.curFigure.moveX(-1, this.freezedSprites)
        break

      case 39: this.curFigure.moveX(1, this.freezedSprites)
        break

      case 40: this.tick()
        break

      case 27: this.pause()
        break
    }
  }

  calcSpeed(curRaund) {
    let decrimend = 700 - curRaund * 5
    if (decrimend < 0) decrimend = 0
    return 300 + decrimend
  }

  pause() {
    if (!this.paused) {
      this.paused = true
      clearInterval(this.calculateInterval)
      document.querySelector('#menu3').style.opacity = 1
    } else {
      this.paused = false
      document.querySelector('#menu3').style.opacity = 0
      this.calculateInterval = setInterval(() => {
        this.tick()
      }, this.calcSpeed(this.curRaund))
    }
  }

  startRaund() {
    this.curRaund++
    document.querySelector('#speed').innerHTML = 1000 - this.calcSpeed(this.curRaund)

    const startLeft = parseInt(this.tetrisWidth / 2) * 30
    const startTop = 30
    const color = colors[getRandomInt(0, colors.length - 1)]

    this.curFigure = new Figure(getRandomFigure(), this.curRaund, this.display.layers.front, this.blockSize, startTop, startLeft, color)

    clearInterval(this.calculateInterval)
    this.calculateInterval = setInterval(() => {
      this.tick()
    }, this.calcSpeed(this.curRaund))
    this.display.render()
  }

  recalculateYPosition(obj) {
    let curTop = parseInt(obj.curElement.style.top) || 0
    return curTop + this.blockSize
  }

  moveToFreezed(curFigure) {
    for (let index in curFigure.sprites) {
      this.freezedSprites[this.freezeIndex] = curFigure.sprites[index]
      this.freezeIndex++
    }
  }

  checkGameOver() {
    const startLeft = parseInt(this.tetrisWidth / 2) * 30
    const startTop = 60

    for (let index in this.freezedSprites) {
      let sprite = this.freezedSprites[index]
      if ((parseInt(sprite.curElement.style.top) <= startTop) & (parseInt(sprite.curElement.style.left) == startLeft))
        return true
    }
    return false
  }

  calcMapPositionX(freezedSprite) {
    return parseInt(parseInt(freezedSprite.curElement.style.left) / this.blockSize)
  }

  calcMapPositionY(freezedSprite) {
    return parseInt(parseInt(freezedSprite.curElement.style.top) / this.blockSize)
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

  moveDown(dropLines) {
    let score = dropLines.length * dropLines.length * this.curRaund
    let curScore = parseInt(document.querySelector('#score').innerHTML)
    document.querySelector('#score').innerHTML = curScore + score
    let linesMap = this.createLinesMap()

    for (let line of dropLines)
      for (let y = line; y > 0; y--)
        for (let x = 0; x < this.tetrisWidth; x++) {
          let tmpIndex = linesMap[y - 1][x]
          if (tmpIndex != null) {
            linesMap[y][x] = linesMap[y - 1][x]
            linesMap[y - 1][x] = null
            let tmpY = parseInt(this.freezedSprites[tmpIndex].options.top)
            this.freezedSprites[tmpIndex].options.top = tmpY + this.blockSize + 'px'
          }
        }

    this.display.layers.front.render()

    setTimeout(() => {
      for (let index in this.removePoll) {
        this.removePoll[index].curElement.remove()
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
    for (let index in this.freezedSprites) {
      let x = this.calcMapPositionX(this.freezedSprites[index])
      let y = this.calcMapPositionY(this.freezedSprites[index])
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
      this.removePoll[index] = this.freezedSprites[index]
      delete (this.freezedSprites[index])
    }
  }

  tick() {
    if (this.paused) {
      return;
    }
    if (!this.curFigure.moveY(1, this.freezedSprites)) {
      this.moveToFreezed(this.curFigure)
      let dropLines = this.checkForDropLines()
      if (dropLines.length > 0) {
        this.startRemove(dropLines)
      }
  
      if (this.checkGameOver()) {
        clearInterval(this.calculateInterval)
        document.querySelector('#menu6').style.opacity = 1
      } else {
        this.startRaund()
      }
    }
  }
  
  createGameContainer() {
    const gameContainer = document.createElement('div')
    gameContainer.id = 'game-container'
    document.body.appendChild(gameContainer)
  }

  reset() {
    clearInterval(this.calculateInterval)
  
    this.freezeIndex = 0
    this.removePoll = {}
    this.paused = true
    this.score = 0
    this.curRaund = 0
    document.querySelector("#score").innerHTML = this.score
  
    document.querySelector("#menu6").style.opacity = 0
  
    if (this.curFigure) {
      for (let key in this.curFigure.sprites) {
        this.curFigure.sprites[key].options.opacity = 0
      }
    }

    for (let key in this.freezedSprites) {
      console.log(this.freezedSprites[key])
      this.freezedSprites[key].options.opacity = 0
      this.display.layers.front.removeSprite(key)
    }

    this.freezedSprites = {}
    this.display.render()
    this.startRaund()
    this.pause()
  }

}

document.addEventListener("keydown", function (e) {
  
  if (e.key === "Enter" && !window.app) {
  document.querySelector("#menu5").style.opacity = 0
  window.app = new Application()
  app.startRaund()
  }
})

