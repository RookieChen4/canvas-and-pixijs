export class Particle {
  constructor(x,y,color) {
    this.baseX = window.innerWidth/2;
    this.baseY = window.innerHeight/2;
    this.x = x;
    this.y = y;
    this.size = 2;
    this.color = color;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.baseX,this.baseY,this.size,0,Math.PI*2)
    ctx.closePath();
    ctx.fill()
  }
  update(ctx) {
    let distanceX = this.x - this.baseX
    let distanceY = this.y - this.baseY
    if(distanceX!=0) {
      this.baseX = this.baseX + (distanceX > 0 ? 1: -1) * 5
    }
    if(distanceY!=0) {
      this.baseY = this.baseY + (distanceY > 0 ? 1: -1) * 5
    }
    this.draw(ctx)
  }
}