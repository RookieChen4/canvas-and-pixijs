import { Particle } from './particle.js'
class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)
    this.MaxNumber = 100;
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
    this.particleArray = []
    let color = 'white'
    for(let i = 0; i < this.MaxNumber; i++) {
      this.particleArray.push(new Particle(rand(0,this.canvas.width),100,color))
    }
  }
  animate() {
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0,0,this.stageWidth,this.stageHeight)
    this.particleArray.forEach(it => {
      this.ctx.rotate(0)
      this.ctx.translate(0,0)
      this.ctx.save()
      it.update(this.ctx)
      this.ctx.restore()
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