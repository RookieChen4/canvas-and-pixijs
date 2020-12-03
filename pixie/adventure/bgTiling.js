export class bgTiling extends PIXI.TilingSprite {
  constructor(width,path) {
    const texture = PIXI.Texture.from(path);
    super(texture,width, texture.height)
    this.texture = texture
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