//@ts-nocheck
function Forest(layerId) {
    let texture = PIXI.Texture.from(`./Layer ${layerId}.png`);
    PIXI.TilingSprite.call(this, texture, 928, 793);
  
    this.position.x = 0
    this.position.y = 0
    this.tilePosition.x = 0
    this.tilePosition.y = 0
  
    this.viewportX = 0;
  }
  
  Forest.prototype = Object.create(PIXI.TilingSprite.prototype);
  
  Forest.prototype.setViewportX = function(newViewportX, delta) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * delta);
  };