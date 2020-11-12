import { Wind } from './wind.js'
export class Rain {
  constructor(x,speed,color) {
    this.width = 2
    this.height = 40;
    this.x = x;
    this.y = Math.random() * -100;
    this.z = Math.random() * 0.5 + 0.5;
    this.color = color;
    this.speed = speed
    this.splashed = false;
  }
  drop(ctx) {
    this.y += this.speed * this.z * 0.4;
    this.x += this.z * Wind.wind ;
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x - Wind.wind * this.z * 1.5, this.y - this.height * this.z);
  }
}