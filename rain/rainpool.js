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
      for(let i = 0; i < 50; i++) {
        let color = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')'
        this.rainPool.push(new Rain(color))
      }
    }
    recycle() {

    }
}