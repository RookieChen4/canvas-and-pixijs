import { Adventure } from './adventure.js'
import { Bg } from './bg.js'
export class App {
  constructor() {
  }
  init() {
    this.app = new Application({                       
      antialias: true,
      transparent: false,
      resolution: 1,
      resizeTo: window
    })
    document.body.appendChild(this.app.view) 
    loader
        .add(["./assets/adventurerSheet.json","./assets/bg/Extension_blue.png",
              "./assets/bg/Extension_green.png","./assets/bg/Background.png",
              "./assets/bg/Middleground.png","./assets/bg/Props.png","./assets/bg/Tileset.png"])
        .load(this.setup.bind(this))
  }
  setup() {
    let blue = new Sprite(loader.resources["./assets/bg/Extension_blue.png"].texture);
    blue.width = this.app.screen.width 
    blue.height = this.app.screen.height/2 
    this.app.stage.addChild(blue);
    let green = new Sprite(loader.resources["./assets/bg/Extension_green.png"].texture);
    green.y = this.app.screen.height/2 
    green.width = this.app.screen.width 
    green.height = this.app.screen.height/2 
    this.app.stage.addChild(green);
    this.bg = new Bg(this.app,"./assets/bg/Background.png")
    this.app.stage.addChild(this.bg);
    this.bg = new Bg(this.app,"./assets/bg/Middleground.png")
    this.app.stage.addChild(this.bg);
    this.adventure = new Adventure(this.app)
    this.app.stage.addChild(this.adventure);
    this.adventure.init()
    let ticker = PIXI.Ticker.shared;
    ticker.minFPS  = 30
    ticker.maxFPS  = 60
    ticker.add(delta => this.gameLoop(delta));
  }
  gameLoop() {
    this.adventure.move()
  }
}
window.onload = () => {
  let app = new App()
  app.init()
  const left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40), 
        space = keyboard(32), A = keyboard(65), S =keyboard(83), D =keyboard(68)
  function keycontrol() {
      left.press = () => {
        app.adventure.direction = 'left'
        app.adventure.vx = -2
        app.adventure.run()
      };
      left.release = () => {
        app.adventure.vx = 0
        app.adventure.idle()
      };
      right.press = () => {
        app.adventure.direction = 'right'
        app.adventure.run()
        app.adventure.vx = 2
      };
      right.release = () => {
        app.adventure.vx = 0
        app.adventure.idle()
      };
      space.press = () => {
        app.adventure.jump()
      };
      space.release = () => {
        app.adventure.fall()
      };
      A.press = () => {
        if(app.adventure.state == 'idle') {
          app.adventure.attack1()
        }else {
          app.adventure.combat = app.adventure.attack1
        }
      };
      A.release = () => {
      };
      S.press = () => {
        if(app.adventure.state == 'idle') {
          app.adventure.attack2()
        }else {
          app.adventure.combat = app.adventure.attack2
        }
      };
      S.release = () => {
      };
      D.press = () => {
        if(app.adventure.state == 'idle') {
          app.adventure.attack3()
        }else {
          app.adventure.combat = app.adventure.attack3
        }
      };
      D.release = () => {
      };
  }
  keycontrol()
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
      if (event.keyCode === key.code) {
          if (key.isUp && key.press) key.press();
          key.isDown = true;
          key.isUp = false;
      }
      event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = event => {
      if (event.keyCode === key.code) {
          if (key.isDown && key.release) key.release();
          key.isDown = false;
          key.isUp = true;
      }
      event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener(
      "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
      "keyup", key.upHandler.bind(key), false
  );
  return key;
}