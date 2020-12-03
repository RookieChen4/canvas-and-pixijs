class Goblin {
    constructor() {
        this.GoblinTexture = resources["./assets/Goblin/Idle.png"].texture.baseTexture
        this.idleTextureList = []
    }

    init() {
        for(let i = 0; i < 7; i++) {
          let rectangle = new PIXI.Rectangle(i * 55, 0, 50, 37);
          let texture = new PIXI.Texture(this.GoblinTexture, rectangle);
          this.idleTextureList.push(texture);
        }
    }

}