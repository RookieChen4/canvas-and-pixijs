export class Point {
  constructor(index,x,y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.cur = index;
    this.speed = 0.1;
    this.max = Math.random() * 100 + 50
  }
  update() {
    this.cur+=this.speed
    this.y = this.fixedY + (Math.sin(this.cur) * this.max)
  }
}