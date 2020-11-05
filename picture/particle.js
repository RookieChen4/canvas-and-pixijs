export class Particle {
  constructor(x,y,color) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.color = color;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
    ctx.closePath();
    ctx.fill()
  }
  update(ctx) {
  }

  easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  }
}