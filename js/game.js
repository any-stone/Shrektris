export default class Game {

  static points = {
    "1": 40,
    "2": 100,
    "3": 300,
    "4": 1200
  }

  static allPiecesRotations = {
    I: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    ],
    J: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    ],
    L: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
    O: [
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
    ],
    S: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
    T: [
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
        [0, 1, 0],
      ],
    ],
    Z: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ]

  }

  constructor() {
    this.reset()
  }

  get level() {
    return Math.floor(this.lines * 0.1)
  }

  getPiecesRotationsByKey(key) {
    if (!Game.allPiecesRotations[key]) {
      new Error("Unknown piece")
    }
    return {
      x: 0,
      y: 0,
      get blocks() { return this.rotations[this.rotationIndex] },
      rotationIndex: 0,
      rotations: Game.allPiecesRotations[key]
    }
  }

  getState() {
    const playfield = this.createPlayfield();
    const { 
      y: pieceY, 
      x: pieceX, 
      blocks 
    } = this.activePiece

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
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
      score: this.score,
      level: this.level,
      lines: this.lines,
      nextPiece: this.nextPiece,
      playfield,
      isGameOver: this.topOut,
    }
  }

  reset() {
    this.score = 0
    this.lines = 0
    this.topOut = false
    this.playfield = this.createPlayfield()
    this.activePiece = this.createPiece()
    this.nextPiece = this.createPiece()
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
    const index = Math.floor(Math.random() * 7)
    const type = "IJLOSTZ"[index]
    let piece = this.getPiecesRotationsByKey(type)
    piece.x = Math.floor((10 - piece.blocks[0].length) / 2)
    return piece
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
    if (this.topOut) {
      return;
    }

    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updatePIeces();
    }

    if (this.hasCollision()) {
      this.topOut = true;
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
        ) {
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
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x]
        }
      }
    }
  }

  clearLines() {
    const rows = 20
    const columns = 10
    let lines = []

    for (let y = rows - 1; y >= 0; y--) {
      let numberOfBlocks = 0

      for (let x = 0; x < columns; x++) {
        if (this.playfield[y][x]) {
          numberOfBlocks += 1
        }
      }

      if (numberOfBlocks === 0) {
        break
      } else if (numberOfBlocks < columns) {
        continue
      } else if (numberOfBlocks === columns) {
        lines.unshift(y)
      }
    }

    for (let index of lines) {
      this.playfield.splice(index, 1)
      this.playfield.unshift(new Array(columns).fill(0))
    }
    return lines.length
  }

  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += Game.points[clearedLines] * (this.level + 1)
      this.lines += clearedLines
    }
  }

  updatePIeces() {
    this.activePiece = this.nextPiece
    this.nextPiece = this.createPiece()
  }
}