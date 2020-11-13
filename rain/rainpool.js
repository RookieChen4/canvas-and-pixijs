import { Rain } from './rain.js'
import { Wind } from './wind.js'
export class rainPool {
    constructor() {
      this.rainPool = []
    }
    recycle(rain) {
      this.rainPool.push(rain);
    }
}