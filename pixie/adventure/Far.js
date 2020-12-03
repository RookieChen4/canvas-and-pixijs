import { bgTiling } from './bgTiling.js'
export class Far extends PIXI.Container {
  constructor(width,height) {
    super()
    this.appwidth = width
    this.appheight = height
  }
  init() {
    this.blue = new bgTiling(this.appwidth,"./assets/bg/Extension_blue.png")
    this.blue.init(0)
    this.addChild(this.blue);
    this.green = new bgTiling(this.appwidth,"./assets/bg/Extension_green.png")
    this.green.init(this.appheight/2)
    this.addChild(this.green);
    this.Background = new bgTiling(this.appwidth,"./assets/bg/Background.png")
    this.Background.init(this.appheight/2 - this.Background.texture.height * 1.5/2)
    this.addChild(this.Background);
    this.Middleground = new bgTiling(this.appwidth,"./assets/bg/Middleground.png")
    this.Middleground.init(this.appheight/2 - this.Middleground.texture.height * 1.5/2)
    this.addChild(this.Middleground);
  }
}