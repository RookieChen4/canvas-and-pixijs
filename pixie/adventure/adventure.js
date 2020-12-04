export class Adventure extends PIXI.Container {
  static GRAVITY = 0.25
  constructor(app) {
    super()
    this.app = app;
    this.adventureSheet = resources["./assets/adventurerSheet.json"].spritesheet;
    this.vx = 0;
    this.vy = 0;
    this.x = 0;
    this.y = 0;
    this.animationSpeed = 0.167
    this.spriteList = [];
    this.animatedSprite = null;
    this.direction = 'right';
    this.isground = false;
    this.state = 'idle';
    this.combat = null;
  }
  init() {
    Object.keys(this.adventureSheet.animations).forEach(it => {
      this.spriteList[it] = this.adventureSheet.animations[it]
    })
    this.animatedSprite = new PIXI.AnimatedSprite(this.spriteList['adventurer-idle'])
    this.animatedSprite.anchor.set(0.5)
    this.animatedSprite.scale.set(1.5)
    this.animatedSprite.animationSpeed = this.animationSpeed; 
    this.addChild(this.animatedSprite);
    this.animatedSprite.play()
    this.x = 50;
    this.y = this.app.screen.height/2;

    this.animatedOnComplete = null;

    let oldValue = this.direction
    Object.defineProperty(this, 'direction', {
      get() { return oldValue; },
      set(newValue) {
        if(oldValue !== newValue) {
          oldValue = newValue;
          newValue == 'left' ? this.animatedSprite.scale.x = -1.5 : this.animatedSprite.scale.x = 1.5;
        }
      }
    });

    this.animatedSprite.onComplete = () => {
      if(this.combat){
        this.combat()
        this.combat = null
      } else {
        this.animatedOnComplete()
      }
    }


    this.healthBar = new Container();
    this.addChild(this.healthBar);

    let innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 50, 8);
    innerBar.endFill();
    this.healthBar.addChild(innerBar);

    let outerBar = new Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, 50, 8);
    outerBar.endFill();
    this.healthBar.addChild(outerBar);
    this.healthBar.outer = outerBar
    this.healthBar.x = -50/2
    this.healthBar.y = -this.animatedSprite.height/2 - 10
  }
  move() {
    this.x += this.vx;
    if(!this.isground) {
      this.y -= (this.vy -= Adventure.GRAVITY)
    }
  }
  auto(x) {
    let distance = (this.x - x)
    this.direction = distance > 0 ? 'left' : 'right'
    distance > 0 ? this.vx = -1 : this.vx = 1;
    if(Math.abs(distance) < 10) {
      this.vx = 0
    }
    (this.state == 'attack' || this.state == 'hurt')? this.vx = 0 : ''
    this.x += this.vx;
    if(!this.isground) {
      this.y -= (this.vy -= Adventure.GRAVITY)
    }
  }
  idle() {
    this.state = 'idle'
    this.animatedSprite.textures = this.spriteList['adventurer-idle']
    this.animatedSprite.animationSpeed = this.animationSpeed
    this.animatedSprite.loop = true
    this.animatedSprite.play()
  }
  run() {
    this.state = 'run'
    this.animatedSprite.textures = this.spriteList['adventurer-run']
    this.animatedSprite.animationSpeed = this.animationSpeed
    this.animatedSprite.loop = true
    this.animatedSprite.play()
  }
  attack1() {
    this.isground&&(this.vx = 0);
    this.state = 'attack'
    this.animatedSprite.textures = this.spriteList['adventurer-attack1']
    this.animatedSprite.animationSpeed = this.animationSpeed
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      if(this.vx !==0) {
        this.run()
      }else {
        this.idle()
      }
    }
  }
  attack2() {
    this.isground&&(this.vx = 0);
    this.state = 'attack'
    this.animatedSprite.textures = this.spriteList['adventurer-attack2']
    this.animatedSprite.animationSpeed = this.animationSpeed
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      if(this.vx !==0) {
        this.run()
      }else {
        this.idle()
      }
    }
  }
  attack3() {
    this.isground&&(this.vx = 0);
    this.state = 'attack'
    this.animatedSprite.textures = this.spriteList['adventurer-attack3']
    this.animatedSprite.animationSpeed = this.animationSpeed
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      if(this.vx !==0) {
        this.run()
      }else {
        this.idle()
      }
    }
  }
  jump() {
    this.state = 'jump'
    this.animatedSprite.textures = this.spriteList['adventurer-jump']
    this.animatedSprite.animationSpeed = this.animationSpeed
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      this.fall()
    }
  }
  fall() {
    this.state = 'fall'
    this.animatedSprite.textures = this.spriteList['adventurer-fall']
    this.animatedSprite.animationSpeed = 0.05
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      if(this.vx !==0) {
        this.run()
      }else {
        this.idle()
      }
    }
  }
  hurt() {
    this.vx = 0
    this.healthBar.outer.width -= 1;
    this.state = 'hurt'
    this.animatedSprite.textures = this.spriteList['adventurer-hurt']
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      if(this.vx !==0) {
        this.run()
      }else {
        this.idle()
      }
    }

    if(this.healthBar.outer.width < 0) {
      this.removeChild(this.healthBar)
      this.removeChild(this.animatedSprite)
    }
  }
}