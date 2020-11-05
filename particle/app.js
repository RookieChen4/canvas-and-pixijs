import { Particle } from './particle.js'
class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    this.fontSize = 600
    this.text = 'hello'
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
    this.ctx.font = this.fontSize + 'px Arial';
    this.ctx.textBaseline = 'middle'
    let textWidth = this.ctx.measureText(this.text).width;
    this.ctx.fillText(this.text,this.stageWidth/2-textWidth/2,this.stageHeight/2)
    this.data = this.ctx.getImageData(0,0,this.stageWidth,this.stageHeight)
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    this.particleArray =[]
    for(let y = 0; y < this.data.height; y+=6) {
      for(let x = 0; x < this.data.width; x+=6) {
        let i = (y * 4 * this.data.width) + (x * 4)
        if(this.data.data[i + 3] > 128 && this.data.data[i] < 100) {
          let positionX = x;
          let positionY = y;
          let color = "rgb(" + this.data.data[i] + ',' + this.data.data[i + 1] + ',' + this.data.data[i + 2] + ')'
          this.particleArray.push(new Particle(positionX , positionY, color))
        }
      }
    }
  }
  animate() {
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    for(let i = 0; i < this.particleArray.length; i++) {
      if(this.particleArray[i].delayCount < this.particleArray[i].delay){
        this.particleArray[i].delayCount += 1;
        continue;
      }
      this.particleArray[i].update(this.ctx)
    }
    // this.particleArray.forEach(it => {
    //   it.update(this.ctx)
    // })
    requestAnimationFrame(this.animate.bind(this))
  }
}

window.onload = () => {
  new App()
}