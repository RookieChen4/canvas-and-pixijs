export class Particle {
  constructor(x,y,color) {
    this.baseX = window.innerWidth/2;
    this.baseY = window.innerHeight/2;
    this.x = x;
    this.y = y;
    this.size = 2;
    this.color = color;

    // 处理动画帧
    this.frameNum = 0;
    this.frameCount = Math.ceil(3000 / 16.66);
    // 处理启动时间
    this.delay = this.frameCount*Math.random();
    this.delayCount = 0;
  }
  draw(ctx,x,y,size,color) {
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.arc(x,y,size,0,Math.PI*2)
    ctx.closePath();
    ctx.fill()
  }
  update(ctx) {
    if(this.frameNum < this.frameCount) {
      let curX = this.easeInOutCubic(this.frameNum, this.baseX, this.x-this.baseX, this.frameCount);
      let curY = this.easeInOutCubic(this.frameNum, this.baseY, this.y-this.baseY, this.frameCount);
      this.draw(ctx,curX, curY,this.size,this.color)
      this.frameNum += 1;
    } else {
      this.draw(ctx,this.x, this.y, this.size,this.color)
    }
  }

  easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  }
}