class Rectangle {
  constructor(height, width, test) {
    this.height = height;
    this.width = width;
    this.test = test;
  }
}

let square = new Rectangle(10, 10, 10);

console.log(square.height); // 100