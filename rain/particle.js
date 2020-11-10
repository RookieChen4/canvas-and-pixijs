export class Particle {
  constructor(x,y,color) {
    this.x = x;
    this.y = y;
    this.vx = 0.2;
    this.vy = 0;
    this.size = 2;
    this.gravity = 0.4;
    this.color = color;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
    ctx.fill();
    ctx.closePath();
  }
  update(ctx) {
    this.x += this.vx
    this.y += this.vy
    ctx.translate(this.x,this.y)
    ctx.rotate(0.15)
    this.vy += this.gravity;
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.fillRect(0,0,this.size,this.size*20)
    ctx.fill();
    ctx.closePath();
  }
}