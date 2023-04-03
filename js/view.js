export default class View {
  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas")
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.context = this.canvas.getContext("2d")

    this.element.appendChild(this.canvas)
  }
}