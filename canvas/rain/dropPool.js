import { Drop } from './drop.js'
export class dropPool {
    constructor() {
      this.dropPool = []
    }
    recycle(drop) {
      this.dropPool.push(drop);
    }
}