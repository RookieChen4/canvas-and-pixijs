import { Particle } from './particle.js'
class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)
    window.addEventListener('resize',this.resize.bind(this),false)
    this.resize()
    this.init()
    // this.animate()
  }
  resize() {
    this.stageWidth = window.innerWidth
    this.stageHeight = window.innerHeight
    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
  }
  init() {
    const img = new Image()
    img.src = '../images/1.jpg'
    img.addEventListener('load',this.drawImage.bind(this,img),false)
  }
  drawImage(img) {
    this.ctx.drawImage(img,0,0)
    this.data = this.ctx.getImageData(0,0,img.width,img.height)
    this.ctx.clearRect(0,0,img.width,img.height)
    this.splitImg(img)
    // this.ctx.drawImage(img, 50, 50, 100, 100, 0, 0, 200, 200);
    // this.particleArray =[]
    // for(let y = 0; y < this.data.height; y++) {
    //   for(let x = 0; x < this.data.width; x++) {
    //     let i = (y * 4 * this.data.width) + (x * 4)
    //     if(this.data.data[i + 3] > 128) {
    //       let positionX = x;
    //       let positionY = y;
    //       let color = "rgb(" + this.data.data[i] + ',' + this.data.data[i + 1] + ',' + this.data.data[i + 2] + ')'
    //       this.particleArray.push(new Particle(positionX * 2, positionY * 2, color))
    //     }
    //   }
    // }
    // this.ctx.fillRect(0,0,img.width * 2,img.height * 2)
    // this.ctx.fill()
    // this.animate()
  }
  splitImg(img) {
    let part = 15
    let divideX = img.width / part
    let divideY = img.height / part
    let distance = 1
    for(let i =0; i < part; i++) {
      for(let j = 0; j < part;j++)
      this.ctx.drawImage(img, divideX*i, divideY*j, divideX, divideY, (divideX + distance)*i, (divideY+distance)*j, divideX, divideY);
    }
  }
  animate() {
    // this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    for(let i = 0; i < this.particleArray.length; i++) {
      this.particleArray[i].draw(this.ctx)
    }
    // requestAnimationFrame(this.animate.bind(this))
  }
}

window.onload = () => {
  new App()
}