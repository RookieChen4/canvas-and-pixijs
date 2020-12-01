export class Bg extends PIXI.TilingSprite {
  constructor(app,path) {
    let texture = PIXI.Texture.from(path);
    super(texture,app.screen.width, texture.height)
    let y = app.screen.height/2 - texture.height * 1.5/2
    this.init(y)
  }
  init(y) {
    this.scale.set(1.5)
    this.position.x = 0
    this.position.y = y
    this.tilePosition.x = 0
    this.tilePosition.y = 0
    this.viewportX = 0;
  }
}