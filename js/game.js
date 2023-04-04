export default class Game {
  score = 0
  lines = 0
  level = 0
  playfield = this.createPlayfield()
  activePiece = this.createPiece()
  nextPiece = this.createPiece()

  getState() {
    const playfield = this.createPlayfield()
    const { y: pieceY, x: pieceX, blocks } = this.activePiece

    for (let y = 0; y < this.playfield.length; y++) {
        playfield[y] = []

      for (let x = 0; x < this.playfield[y].length; x++) {
          playfield[y][x] = this.playfield[y][x]
      }
  }
    for (let y = 0; y < blocks.length; y++) {
        for (let x = 0; x < blocks[y].length; x++) {
          if (blocks[y][x]) {
            playfield[pieceY + y][pieceX + x] = blocks[y][x]
          }
        }
    }
    return {
      playfield
    }
  }

  createPlayfield() {
    const playfield = []

    for (let y = 0; y < 20; y++) {
        playfield[y] = []

        for (let x = 0; x < 10; x++) {
          playfield[y][x] = 0
          
        }
    }
    return playfield
  }

  createPiece() {
    return {
      x: 0,
      y: 0,
      get blocks() {
        return this.rotations[this.rotationIndex]
      },
      rotationIndex: 0,
      rotations: [
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0]
        ],
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0]
        ],
      ]
    }
  }

  movePieceLeft() {
    this.activePiece.x -= 1

    if (this.hasCollision()) {
      this.activePiece.x += 1
    }
  }

  movePieceRight() {
    this.activePiece.x += 1

    if (this.hasCollision()) {
      this.activePiece.x -= 1
    }
  }

  movePieceDown() {
    this.activePiece.y += 1

    if (this.hasCollision()) {
      this.activePiece.y -= 1
      this.lockPiece()
      this.updatePIeces()
    }
  }

  rotatePiece() {
    this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0

    if (this.hasCollision()) {
      this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3
    }
    return this.activePiece.blocks
  }

  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] && 
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) || 
          this.playfield[pieceY + y][pieceX + x])
          ){
          return true
        }
      }
    }
    return false
  } 

  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
          if(blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x]
        }
      }
    }
  }

  updatePIeces() {
    this.activePiece = this.nextPiece
    this.nextPiece = this.createPiece()
  }
}