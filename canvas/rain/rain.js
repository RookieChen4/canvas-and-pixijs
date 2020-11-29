import { Wind } from './wind.js'
export class Rain {
  static speed = 20
  constructor() {
    this.width = 2
    this.height = 40;
    this.x = 0;
    this.y = Math.random() * -100;
    this.z = Math.random() * 0.5 + 0.5;
    this.splashed = false;
  }
  init(x,color) {
    this.x = x;
    this.y = Math.random() * -100;
    this.color = color;
    this.splashed = false;
  }
  drop(ctx, multiplier) {
    this.y += Rain.speed * this.z * multiplier;
    this.x += this.z * Wind.wind * multiplier;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x - Wind.wind * this.z * 1.5, this.y - this.height * this.z);
  }
}