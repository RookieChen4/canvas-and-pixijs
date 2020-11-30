import { Adventure } from './adventure.js'
export class App {
  constructor() {
  }
  init() {
    this.app = new Application({
      width: 512,
      height: 256,                       
      antialias: true,
      transparent: false,
      resolution: 1,
      resizeTo: window
    })
    document.body.appendChild(this.app.view) 
    loader
        .add(["./assets/DinoSpriteSheet.json","./assets/adventurerSheet.png"])
        .load(this.setup.bind(this))
  }
  setup() {
    this.adventure = new Adventure(this.app)
    this.adventure.init()
    this.app.stage.addChild(this.adventure);
    this.adventure.idle()
    // let ticker = PIXI.Ticker.shared;
    // ticker.minFPS  = 30
    // ticker.maxFPS  = 60
    // ticker.add(delta => this.gameLoop(delta));
  }
  gameLoop() {
    this.adventure.idle()
  }
}
window.onload = () => {
  const app = new App()
  app.init()
}