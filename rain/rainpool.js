import { Rain } from './rain.js'
export class rainPool {
    constructor() {
      this.color = {
        r: '80',
        g: '175',
        b: '255',
        a: '0.5'
      };
      this.rainPool = []
      let wind_expand = Math.abs(window.innerHeight / 20 * 4); // expand spawn width as wind increases
      for(let i = 0; i < 10; i++) {
        let spawn_x = Math.random() * (window.innerWidth + wind_expand);
        spawn_x -= wind_expand;
        let color = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')'
        this.rainPool.push(new Rain(spawn_x,color))
      }
    }
    recycle() {

    }
}