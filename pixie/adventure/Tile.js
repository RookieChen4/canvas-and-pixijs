export class Tile {
  constructor() {
    this.TilesetTexture = resources["./assets/bg/Tileset.png"].texture.baseTexture
    this.groundPool = []
    this.wallPool = []
    this.generateWall()
    this.generateGround()
  }

  generateWall() {
    for(let i = 0; i < 20; i++) {
      let rectangle = new PIXI.Rectangle(16* 7, 16, 16 * 4, 16 * 4);
      let wallTexture = new PIXI.Texture(this.TilesetTexture, rectangle);
      let wall = new Sprite(wallTexture);
      wall.scale.set(1.5)
      this.wallPool.push(wall)
    }
  }

  generateGround() {
    for(let i = 0; i < 10; i++) {
      let rectangle = new PIXI.Rectangle(16* 12, 16, 16 * 4, 16);
      let groundTexture = new PIXI.Texture(this.TilesetTexture, rectangle);
      let ground = new Sprite(groundTexture);
      ground.scale.set(1.5)
      this.groundPool.push(ground)
    }
  }
}