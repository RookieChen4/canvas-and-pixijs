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
      this.ctx.stroke()
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