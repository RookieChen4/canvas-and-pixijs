function dino() {
  PIXI.Container.call(this);
  this.moveIndex = 0;
  this.x = 20;
  this.y = 220;
  this.dinoId = resources["./DinoSpriteSheet.json"].textures;
  this.dinoSprite = null;
}

dino.prototype = Object.create(PIXI.Container.prototype);

dino.MOVEDELTA = 0.2

dino.prototype.loop = function() {
  if(this.moveIndex > 10) this.moveIndex = 4;
  this.moveIndex += dino.MOVEDELTA;
  this.removeChild(this.dinoSprite);
  this.dinoSprite = new Sprite(this.dinoId[`DinoSpriteSheet ${parseInt(this.moveIndex)}.png`]);
  this.addChild(this.dinoSprite);
}