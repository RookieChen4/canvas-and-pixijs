import { rainPool } from './rainpool.js'
import { Drop } from './drop.js'
import { Wind } from './wind.js'
export class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    this.dpr = window.devicePixelRatio || 1;
    this.drop_pool = []
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
    this.RainPool = new rainPool(this.stageWidth, this.stageHeight)
  }
  animate() {
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    this.ctx.fillRect(0,0,this.stageWidth,this.stageHeight)
    this.RainPool.rainPool.forEach((it,index) => {
      this.ctx.beginPath()
      it.drop(this.ctx)
      if (it.y >= this.stageHeight) {
        if(!it.splashed) {
          this.splash(it.x);
          it.splashed = true
        }
      }
      if (it.y > this.stageHeight + it.height * 2|| (Wind.wind < 0 && it.x < Wind.wind) || (Wind.wind > 0 && it.x > this.stageWidth + Wind.wind)) {
        this.RainPool.recycle(index)
      }
      this.ctx.stroke()
    })
    this.drop_pool.forEach((item,index) => {
      item.x += item.speed_x * 0.4;
      item.y += item.speed_y * 0.4;
      // apply gravity - magic number 0.3 represents a faked gravity constant
      item.speed_y += 0.3 * 0.4;
      // apply wind (but scale back the force)
      item.speed_x += 4 / 25 * 0.4;
      // if (item.speed_x < -5) {
      //   item.speed_x = -5;
      // }else if (item.speed_x > 5) {
      //   item.speed_x = 5;
      // }
      // recycle
      if (item.y > this.stageHeight + item.radius * 10) {
        this.recycle(index);
      }
      this.ctx.drawImage(item.canvas, item.x-item.radius, item.y-item.radius);
    })
    requestAnimationFrame(this.animate.bind(this))
  }
  splash(x) {
    for (var i=0; i<16; i++) {
      let drop = new Drop()
      drop.init(x);
			this.drop_pool.push(drop);
		}
  }
  recycle(index) {
    this.drop_pool.splice(index, 1);
  }
}

window.onload = () => {
  const app = new App()
  let mouseHandler = function(evt) {
    updateCursor(evt.clientX, evt.clientY);
  }
  let updateCursor = function(x, y) {
    x /= app.stageWidth
    y /= app.stageHeight;
    Wind.wind = (x - 0.5) * 50;
  }
  document.addEventListener('mousemove', mouseHandler);
}



function rand(low, high) {
  return Math.random() * (high - low) + low;
}