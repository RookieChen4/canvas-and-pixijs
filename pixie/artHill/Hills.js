//@ts-nocheck
function Hills(hillId) {
  let texture = PIXI.Texture.from(`./Hills Layer ${hillId}.png`);
  PIXI.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0
  this.position.y = 0
  this.tilePosition.x = 0
  this.tilePosition.y = 0

  this.viewportX = 0;
}

Hills.prototype = Object.create(PIXI.TilingSprite.prototype);

Hills.prototype.setViewportX = function(newViewportX, delta) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * delta);
};