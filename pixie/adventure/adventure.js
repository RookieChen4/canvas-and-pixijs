export class Adventure extends PIXI.Container {
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
    this.state = 'idle';
    this.combat = null;
  }
  init() {
    Object.keys(this.adventureSheet.animations).forEach(it => {
      this.spriteList[it] = this.adventureSheet.animations[it]
    })
    this.animatedSprite = new PIXI.AnimatedSprite(this.spriteList['adventurer-idle'])
    // this.animatedSprite.anchor.set(0.5)
    this.animatedSprite.animationSpeed = this.animationSpeed; 
    this.addChild(this.animatedSprite);
    this.animatedSprite.play()
    this.pivot.x = this.width/2
    this.pivot.y = this.height/2
    this.scale.x *= 1.5
    this.scale.y *= 1.5
    this.x = 50;
    this.y = 50;

    this.animatedOnComplete = null;

    let oldValue = this.direction
    Object.defineProperty(this, 'direction', {
      get() { return oldValue; },
      set(newValue) {
        if(oldValue !== newValue) {
          oldValue = newValue;
          newValue == 'left' ? this.scale.x = -1.5 : this.scale.x = 1.5;
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
  }
  move() {
    this.x += this.vx;
  }
  idle() {
    this.state = 'idle'
    this.animatedSprite.textures = this.spriteList['adventurer-idle']
    this.animatedSprite.loop = true
    this.animatedSprite.play()
  }
  run() {
    this.state = 'run'
    this.animatedSprite.textures = this.spriteList['adventurer-run']
    this.animatedSprite.loop = true
    this.animatedSprite.play()
  }
  attack1() {
    this.state = 'attack'
    this.animatedSprite.textures = this.spriteList['adventurer-attack1']
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      this.idle()
    }
  }
  attack2() {
    this.state = 'attack'
    this.animatedSprite.textures = this.spriteList['adventurer-attack2']
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      this.idle()
    }
  }
  attack3() {
    this.state = 'attack'
    this.animatedSprite.textures = this.spriteList['adventurer-attack3']
    this.animatedSprite.loop = false
    this.animatedSprite.play()
    this.animatedOnComplete = () => {
      this.idle()
    }
  }
  jump() {
    this.state = 'jump'
    this.animatedSprite.textures = this.spriteList['adventurer-jump']
    this.animatedSprite.play()
  }
  fall() {
    this.state = 'jump'
    this.animatedSprite.textures = this.spriteList['adventurer-fall']
    this.animatedSprite.play()
  }
}