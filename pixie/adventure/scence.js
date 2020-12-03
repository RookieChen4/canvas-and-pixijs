import { Tile } from './Tile.js'
export class Scence {
  constructor(app) {
    this.app = app
    this.hloffet =81
  }
  init() {
    this.Tile = new Tile()
    this.Tile.wallPool.forEach((it,index) => {
      it.y = this.app.screen.height/2 + this.hloffet
      it.x = 24*index * 4
      this.app.stage.addChild(it);
    })
  }
}