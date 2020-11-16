import { Particle } from './particle.js'
import { Tile } from './tile.js'
class App {
  constructor() {
    this.last_timestamp = 0;
    this.drop_delay = 25;
    this.total_time = 0;
    this.animate_index = 0;
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
    img.src = './2.jpg'
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
    this.tileList = []
    let Xpart = 15
    let Ypart = 8
    let divideX = img.width / Xpart
    let divideY = img.height / Ypart
    this.mutiX = this.stageWidth/ img.width
    this.mutiY = this.stageHeight/ img.height
    let index = 0;
    for(let j = Ypart; j >= 0; j--) {
      for(let i = 0; i < Xpart;i++){
        let real_x = this.mutiX * (divideX + 10) * (i) + 1
        let real_y = this.mutiY * (divideY+10) * (j) - 20
        var tile = new Tile(divideX,divideY,real_x,real_y,index)
        tile.init(img,divideX*i,divideY*j)
        this.tileList.push(tile)
        index++;
      }
    }
    requestAnimationFrame(this.animate.bind(this))
  }
  animate(time) {
    let frame_time = time - this.last_timestamp
    if (frame_time < 0) {
			frame_time = 17;
		}
		else if (frame_time > 68) {
			frame_time = 20;
    }
    this.total_time += frame_time
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    // for(let i = 0; i < this.particleArray.length; i++) {
    //   this.particleArray[i].draw(this.ctx)
    // }
    for(let i = 0; i < this.tileList.length; i++) {
      let tile = this.tileList[i]
      if((i) * (this.drop_delay + 250) <= this.total_time + 2000) {
        tile.updatePosition()
      }
      this.ctx.drawImage(tile.canvas, tile.baseX, tile.baseY, this.mutiX * tile.width, this.mutiY * tile.height);
    }
    // this.animate_index ++
    // if(this.animate_index > this.tileList.length) {
    //   this.animate_index = this.tileList.length
    // }
    requestAnimationFrame(this.animate.bind(this))
  }
}

window.onload = () => {
  new App()
}