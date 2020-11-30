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
        .add(["./assets/adventurerSheet.json"])
        .load(this.setup.bind(this))
  }
  setup() {
    this.adventure = new Adventure(this.app)
    this.app.stage.addChild(this.adventure);
    this.adventure.init()
  }
}
window.onload = () => {
  let app = new App()
  app.init()
  const left = keyboard(37), up = keyboard(38), right = keyboard(39), down = keyboard(40), space = keyboard(32);
  function keycontrol() {
      left.press = () => {
        app.adventure.direction = 'left'
        app.adventure.run()
      };
      left.release = () => {
        app.adventure.idle()
      };
      right.press = () => {
        app.adventure.direction = 'right'
        app.adventure.run()
      };
      right.release = () => {
        app.adventure.idle()
      };
      space.press = () => {
      };
      space.release = () => {
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