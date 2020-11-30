export class Adventure extends PIXI.Container {
  constructor(app) {
    super()
    this.app = app;
    this.adventureSheet = resources["./assets/adventurerSheet.json"].spritesheet;
    this.x = 0;
    this.y = 0;
    this.animationSpeed = 0.167
    this.spriteList = [];
    this.animatedSprite = null;
    this.direction = 'right'
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
    this.x = 50;
    this.y = 50;
  }
  idle() {
    this.animatedSprite.textures = this.spriteList['adventurer-idle']
    this.animatedSprite.play()
  }
  run() {
    this.animatedSprite.textures = this.spriteList['adventurer-run']
    this.direction == 'left' ? this.scale.x = -1 : this.scale.x = 1;
    this.animatedSprite.play()
  }
}