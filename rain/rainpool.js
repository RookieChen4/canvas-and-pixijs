import { Rain } from './rain.js'
import { Wind } from './wind.js'
export class rainPool {
    constructor(stageWidth,stageHeight) {
      this.stageWidth = stageWidth
      this.stageHeight = stageHeight
      this.color = {
        r: '80',
        g: '175',
        b: '255',
        a: '0.5'
      };
      this.rainPool = []
      // 风向
      // 下落速度
      this.speed = 20;
      this.init()
    }
    init() {
      for(let i = 0; i < 50; i++) {
        this.addRain()
      }
    }
    addRain() {
      let wind_expand = Math.abs(this.stageHeight / this.speed * Wind.wind);
      let spawn_x = Math.random() * (this.stageWidth + wind_expand);
      spawn_x -= wind_expand;
      let color = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')'
      this.rainPool.push(new Rain(spawn_x,this.speed,color))
    }
    recycle(index) {
      this.rainPool.splice(index, 1);
      this.addRain();
    }
}