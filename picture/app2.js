import { Tile2 } from './tile2.js'
const ApiKey = 'DxLjJAwanMbbuH8qZMLEwu5ckEtnIrJWquNNlVrRae8'
let query = 'japanese'
const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ApiKey}&orientation=landscape`
function request(url) {
  return fetch(url)
  .then(response => {
      if(response.status != 200) {
          throw new Error('Whoops!')
          return
      }
      return response.json()
  })
}
class App {
  constructor() {
    this.last_timestamp = 0;
    this.drop_delay = 2500;
    this.total_time = 0;
    this.animate_index = 0;
    this.finalList = []
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)
    window.addEventListener('resize',this.resize.bind(this),false)
    this.resize()
    this.init()
  }
  resize() {
    this.stageWidth = window.innerWidth
    this.stageHeight = window.innerHeight
    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
  }
  async init() {
    this.showList = []
    this.imgList = (await request(url)).results
    this.imgList = this.imgList.map(it => it.urls.small)
    this.imgList.forEach((it,index) => {
      const img = new Image()
      img.src = it
      img.onload = () => {
        this.showList.push(img)
      }
    })
    this.initTile()
  }
  initTile() {
    this.tileList = []
    let Xpart = 3
    let Ypart = 3
    let divide = 10
    let divideX = (this.stageWidth - ((Xpart + 1) * divide))/ Xpart
    let divideY = (this.stageHeight - ((Ypart + 1)* divide))/ Ypart
    let index = 0;
    for(let j = 0; j < Ypart;j++) {
      for(let i = 0; i < Xpart;i++){
        let real_x = (divideX + divide) * (i) + divide
        let real_y = (divideY + divide) * (j) + divide
        var tile = new Tile2(divideX,divideY,real_x,real_y,index)
        this.tileList.push(tile)
        index++;
      }
    }
    requestAnimationFrame(this.animate.bind(this))
  }
  initImg() {
    for(let i = 0; i < this.showList.length - 1; i++) {
        let img = this.showList.shift()
        let tile = this.tileList.shift()
        tile.init(img)
        this.finalList.push(tile)
      }
  }
  animate(time) {
    this.initImg()
    let frame_time = time - this.last_timestamp
    if (frame_time < 0) {
			frame_time = 17;
		}
		else if (frame_time > 68) {
			frame_time = 20;
    }
    this.total_time += frame_time
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    for(let i = 0; i < this.finalList.length; i++) {
      let tile = this.finalList[i]
      if((i) * (this.drop_delay + 250) <= this.total_time + 2000) {
        tile.updatePosition()
      }
      this.ctx.drawImage(tile.canvas, tile.baseX, tile.baseY, tile.width, tile.height);
    }
    requestAnimationFrame(this.animate.bind(this))
  }
}

window.onload = () => {
  new App()
}