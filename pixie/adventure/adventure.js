export class Adventure extends PIXI.Container {
  constructor(app) {
    super()
    this.app = app;
    this.adventurerSheet = resources["./assets/adventurerSheet.png"].texture.baseTexture;
    this.x = 0;
    this.y = 0;
    this.textureList = [];
  }
  init() {
    for(let i = 0; i < 7; i++) {
      let rectangle = new PIXI.Rectangle(i * 50, 0, 50, 37);
      let texture = new PIXI.Texture(this.adventurerSheet, rectangle);
      this.textureList.push(texture);
    }
  }
  idle() {
    let animatedSprite = new PIXI.AnimatedSprite(this.textureList);
    animatedSprite.animationSpeed = 0.167; 
    animatedSprite.play()
    this.addChild(animatedSprite);
  }
}