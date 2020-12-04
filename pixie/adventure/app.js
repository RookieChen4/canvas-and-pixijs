import { Adventure } from './adventure.js'
import { Scence } from './scence.js'
import { Far } from './Far.js'
export class App {
  constructor() {
    this.creature = []
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
              "./assets/bg/Middleground.png","./assets/bg/Props.png","./assets/bg/Tileset.png",
              "./assets/Goblin/Attack.png","./assets/Goblin/Death.png","./assets/Goblin/Idle.png",
              "./assets/Goblin/Run.png","./assets/Goblin/Take Hit.png"])
        .load(this.setup.bind(this))
  }
  setup() {
    this.far = new Far(this.app.screen.width,this.app.screen.height)
    this.far.init()
    this.app.stage.addChild(this.far);
    this.scence = new Scence(this.app)
    this.scence.init()
    this.adventure = new Adventure(this.app)
    this.app.stage.addChild(this.adventure);
    this.adventure.init()
    this.creature.push(this.adventure)

    this.adventure2 = new Adventure(this.app)
    this.app.stage.addChild(this.adventure2);
    this.adventure2.init()
    this.adventure2.run()
    this.adventure2.x = this.app.screen.width/2;
    this.adventure2.direction = 'left'
    this.creature.push(this.adventure2)


    this.gameOverScene = new Container();
    this.app.stage.addChild(this.gameOverScene);
    this.gameOverScene.visible = false;
    let style = new TextStyle({
        fontFamily: "Futura",
        fontSize: 64,
        fill: "white"
    });
    this.message = new Text("The End!", style);
    this.message.x = 120;
    this.message.y = 0;
    this.gameOverScene.addChild(this.message);


    let ticker = PIXI.Ticker.shared;
    ticker.minFPS  = 30
    ticker.maxFPS  = 60
    ticker.add(delta => this.gameLoop(delta));
  }
  gameLoop() {
    if(this.adventure.healthBar.outer.width < 0) {
      this.message.text = "You Lost!";
      this.gameOverScene.visible = true
    }else {
      this.adventure.move()
      this.adventure2.auto(this.adventure.x)
      enemyDetect(this.adventure2,this.adventure)
      this.scence.Tile.wallPool.forEach(element => {
        this.creature.forEach(it => {
          hitWallReact(it, element)
        })
      });
      (this.creature.length >= 2) &&this.creature.forEach((it,index) => {
        for(let i = index + 1; i < this.creature.length;i ++) {
          this.hitCharacter(it, this.creature[i])
          // this.hitCharacter(this.creature[i],it)
          if(this.creature[i].healthBar.outer.width < 0) {
            this.message.text = "You Win!";
            this.gameOverScene.visible = true
            this.app.stage.removeChild(this.creature[i])
            this.creature.splice(i, 1);
          }
        }
      })
    }
  }

  hitCharacter(c1,c2) {
    if(c1.state == 'attack') {
      let centerX = c1.x;
      let centerY = c1.y;
      let centerX2 = c2.x;
      let centerY2 = c2.y;

      let distance = []
      let rang = 37.5 + 15
      if(c1.direction == 'left') {
        distance = [centerX - rang, centerX]
      } else {
        distance = [centerX, centerX + rang]
      }
      if(centerX2 < distance[1] && centerX2 > distance[0] && (centerY2 - centerY) < c2.height) {
        c2.hurt()
      }
    }
    if(c2.state == 'attack') {
      let centerX = c2.x;
      let centerY = c2.y;
      let centerX2 = c1.x;
      let centerY2 = c1.y;

      let distance = []
      let rang = 37.5 + 15
      if(c2.direction == 'left') {
        distance = [centerX - rang, centerX]
      } else {
        distance = [centerX, centerX + rang]
      }
      if(centerX2 < distance[1] && centerX2 > distance[0] && Math.abs(centerY2 - centerY) < c1.height + 10) {
        c1.hurt()
      }
    }
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
        if(app.adventure.state != 'attack') {
          app.adventure.vx = -2
        }
        if(app.adventure.isground && app.adventure.state != 'attack') {
          app.adventure.run()
        }
      };
      left.release = () => {
        if(!right.isDown) {
          app.adventure.vx = 0
        }
        if(app.adventure.isground && app.adventure.state != 'attack') {
          app.adventure.idle()
        }
      };
      right.press = () => {
        app.adventure.direction = 'right'
        if(app.adventure.state != 'attack') {
          app.adventure.vx = 2
        }
        if(app.adventure.isground && app.adventure.state != 'attack') {
          app.adventure.run()
        }
      };
      right.release = () => {
        if(!left.isDown) {
          app.adventure.vx = 0
        }
        if(app.adventure.isground && app.adventure.state != 'attack') {
          app.adventure.idle()
        }
      };
      space.press = () => {
        if(app.adventure.isground) {
          app.adventure.isground = false
          app.adventure.jump()
          app.adventure.vy = 8
        }
      };
      space.release = () => {
        // app.adventure.fall()
      };


      A.press = () => {
        if(app.adventure.state != 'attack') {
          app.adventure.attack1()
        }else {
          app.adventure.combat = app.adventure.attack1
        }
        // if(app.adventure.state == 'idle') {
        //   app.adventure.attack1()
        // }else {
        //   app.adventure.combat = app.adventure.attack1
        // }
      };
      A.release = () => {
      };
      S.press = () => {
        if(app.adventure.state != 'attack') {
          app.adventure.attack2()
        }else {
          app.adventure.combat = app.adventure.attack2
        }
        // if(app.adventure.state == 'idle') {
        //   app.adventure.attack2()
        // }else {
        //   app.adventure.combat = app.adventure.attack2
        // }
      };
      S.release = () => {
      };
      D.press = () => {
        if(app.adventure.state != 'attack') {
          app.adventure.attack3()
        }else {
          app.adventure.combat = app.adventure.attack3
        }
        // if(app.adventure.state == 'idle') {
        //   app.adventure.attack3()
        // }else {
        //   app.adventure.combat = app.adventure.attack3
        // }
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

function hitWallReact (r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy,collision;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x;
  r1.centerY = r1.y;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = (r1.width - 50)/ 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
        let overlapX = combinedHalfWidths - Math.abs(vx);
        let overlapY = combinedHalfHeights - Math.abs(vy);
        //The collision has occurred on the axis with the
        //*smallest* amount of overlap. Let's figure out which
        //axis that is

        if (overlapX >= overlapY) {
          //The collision is happening on the X axis
          //But on which side? vy can tell us

          if (vy > 0) {
            collision = "top";
            //Move the rectangle out of the collision
            r1.y = r1.y + overlapY;
          } else {
            r1.isground = true
            collision = "bottom";
            //Move the rectangle out of the collision
            r1.y = r1.y - overlapY;
            r1.vy = 0
          }
        } else {
          //The collision is happening on the Y axis
          //But on which side? vx can tell us

          if (vx > 0) {
            collision = "left";
            //Move the rectangle out of the collision
            r1.x = r1.x + overlapX;
          } else {
            collision = "right";
            //Move the rectangle out of the collision
            r1.x = r1.x - overlapX;
          }
        }
    } else {

        //There's no collision on the y axis
        hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return {hit,collision};
}

function enemyDetect(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy,collision;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x;
  r1.centerY = r1.y;
  r2.centerX = r2.x;
  r2.centerY = r2.y;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = (r1.width - 50)/ 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = (r1.width) / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
        let overlapX = combinedHalfWidths - Math.abs(vx);
        let overlapY = combinedHalfHeights - Math.abs(vy);
        if (overlapX >= overlapY) {
          //The collision is happening on the X axis
          //But on which side? vy can tell us
          if (vy > 0) {
            collision = "top";
          } else {
            collision = "bottom";
          }
        } else {
          if (vx > 0) {
            if(r1.state !== 'attack') {
              r1[`attack${parseInt(Math.random()*3 + 1)}`]()
            }
            r1.direction = 'left'
            collision = "left";
          } else {
            if(r1.state !== 'attack') {
              r1[`attack${parseInt(Math.random()*3 + 1)}`]()
            }
            r1.direction = 'right'
            collision = "right";
          }
        }
    } else {
        hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return {hit,collision};
}