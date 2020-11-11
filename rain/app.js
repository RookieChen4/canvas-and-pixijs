import { rainPool } from './rainpool.js'
export class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    this.dpr = window.devicePixelRatio || 1;
    document.body.appendChild(this.canvas)
    window.addEventListener('resize',this.resize.bind(this),false)
    this.resize()
    this.init()
    this.animate()
  }
  resize() {
    this.stageWidth = window.innerWidth
    this.stageHeight = window.innerHeight
    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
  }
  init() {
    this.RainPool = new rainPool()
  }
  animate() {
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    this.RainPool.rainPool.forEach(it => {
      this.ctx.beginPath()
      it.drop(this.ctx)
      if (it.y > this.stageHeight) {
        it.splash();
      }
      this.ctx.stroke()
      it.drop_pool.forEach(it => {
        it.x += it.speed_x * 0.4;
        it.y += it.speed_y * 0.4;
        // apply gravity - magic number 0.3 represents a faked gravity constant
        it.speed_y += 0.3 * 0.4;
        // apply wind (but scale back the force)
        it.speed_x += 4 / 25 * 0.4;
        if (it.speed_x < -5) {
          it.speed_x = -5;
        }else if (it.speed_x > 5) {
          it.speed_x = 5;
        }
        // // recycle
        // if (it.y > height + it.radius) {
        //   drops.splice(i, 1);
        // }
        this.ctx.drawImage(it.canvas, it.x-it.radius, it.y-it.radius);
      })
    })
    requestAnimationFrame(this.animate.bind(this))
  }
}

window.onload = () => {
  new App()
}


function rand(low, high) {
  return Math.random() * (high - low) + low;
}