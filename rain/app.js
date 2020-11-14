import { Rain } from './rain.js'
import { Drop } from './drop.js'
import { rainPool } from './rainpool.js'
import { dropPool } from './dropPool.js'
import { Wind } from './wind.js'
export class App {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx =  this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)
    window.addEventListener('resize',this.resize.bind(this),false)
    this.resize()
    this.init()
    requestAnimationFrame(this.animate.bind(this))
  }
  resize() {
    this.stageWidth = window.innerWidth
    this.stageHeight = window.innerHeight
    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
  }
  init() {
    this.color = {
      r: '255',
      g: '255',
      b: '255',
      a: '0.5'
    };
    this.fps = 16.67;
    this.dpr = window.devicePixelRatio || 1;
    this.last_timestamp = 0;
    this.multiplier = 0;
    this.drop_time = 0;
    this.drop_delay = 25;
    this.speed = 1;
    this.rain = [];
    this.drop = [];
    this.rain_Pool = new rainPool()
    this.drop_pool = new dropPool()
  }
  animate(time) {
    let frame_time = time - this.last_timestamp
    this.last_timestamp = time
    if (frame_time < 0) {
			frame_time = 17;
		}
		else if (frame_time > 68) {
			frame_time = 68;
		}
    this.multiplier = this.speed * frame_time / this.fps
    this.drop_time += frame_time*this.speed
    while(this.drop_time > this.drop_delay) {
      this.drop_time -= this.drop_delay
      let new_rain = this.rain_Pool.rainPool.pop() || new Rain();
      let wind_expand = Math.abs(this.stageHeight / this.speed * Wind.wind);
      let spawn_x = Math.random() * (this.stageWidth + wind_expand);
      spawn_x -= wind_expand;
      let color = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')'
      new_rain.init(spawn_x,color)
      this.rain.push(new_rain)
    }
    this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
    this.ctx.beginPath();
    for (let i = this.rain.length - 1; i >= 0; i--) {
      let r = this.rain[i];
      r.drop(this.ctx,this.multiplier)
      if (r.y > this.stageHeight) {
        if(!r.splashed) {
          this.splash(r.x);
          r.splash = true
        }
      }
      // // recycle rain
      if (r.y > this.stageHeight + r.height * r.z || (Wind.wind < 0 && r.x < Wind.wind) || (Wind.wind > 0 && r.x > this.stageWidth + Wind.wind)) {
        this.rain_Pool.recycle(r);
        this.rain.splice(i, 1);
      }
    }
    this.ctx.stroke()
    for(let i = this.drop.length - 1; i >= 0; i--){
      let drop = this.drop[i]
      drop.update(this.multiplier)
      let x = drop.x - drop.radius;
      let y = drop.y - drop.radius;
      this.ctx.drawImage(drop.canvas, x, y);
      if (drop.y > this.stageHeight + drop.radius) {
        this.drop_pool.recycle(drop);
        this.drop.splice(i, 1);
      }
    }
    requestAnimationFrame(this.animate.bind(this))
  }
  splash(x) {
    for (var i=0; i<16; i++) {
      let drop = this.drop_pool.dropPool.pop() || new Drop();
      drop.init(x,this.stageHeight)
      this.drop.push(drop)
		}
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
    let y_inverse = (1 - y);
	
    app.drop_delay = y_inverse*y_inverse*y_inverse * 100 + 2;
    Wind.wind = (x - 0.5) * 50;
  }
  document.addEventListener('mousemove', mouseHandler);
}