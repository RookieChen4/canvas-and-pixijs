function dino() {
  PIXI.Container.call(this);
  this.dinoId = resources["./DinoSpriteSheet.json"].textures;
  this.dinoSprite = null;
  this.moveIndex = 0;
  this.x = 20;
  this.y = 241;
  this.vx = 0;
  this.vy = 0;
  this.direction = 'right'
  this.isJump = false
  this.isHit = false
  this.collision = ''
}

dino.prototype = Object.create(PIXI.Container.prototype);

dino.MOVEDELTA = 0.2
dino.JUMPSPEED = 6
dino.GRAVITY = 0.25

dino.prototype.setX = function(x) {
  this.x = x;
}

dino.prototype.setY = function(y) {
  this.y = y;
}

dino.prototype.Moveloop = function() {
  if(this.moveIndex > 10) this.moveIndex = 4;
  this.moveIndex += dino.MOVEDELTA;
  this.removeChild(this.dinoSprite);
  this.dinoSprite = new Sprite(this.dinoId[`DinoSpriteSheet ${parseInt(this.moveIndex)}.png`]);
  this.dinoSprite.width = 24
  this.dinoSprite.height = 24
  this.dinoSprite.pivot.x = this.dinoSprite.width / 2;
  this.dinoSprite.pivot.y = this.dinoSprite.height;
  this.direction == 'left' ? this.dinoSprite.scale.x = -1 : '';
  this.addChild(this.dinoSprite);
}

dino.prototype.move = function() {
  this.Moveloop()
  if(this.collision == 'left'||this.collision == 'right') this.vx = 0;
  if(this.collision == 'top'||this.collision == 'bottom') this.vy = 0;
  this.x += this.vx;
  // if(this.isJump) this.y -= (dino.JUMPSPEED -= dino.GRAVITY);
  // if (this.y >= 241) {
  //     this.y = 241
  //     dino.JUMPSPEED = 6
  //     this.isJump = false
  // }
  (this.isHit) ? '' : this.y -= (this.vy -= dino.GRAVITY);
}

dino.prototype.autoMove = function() {
  this.Moveloop()
}

dino.prototype.setVX = function(vx) {
  this.vx = vx;
}

dino.prototype.setVY = function(vy) {
  this.vy = vy;
}

dino.prototype.changeDirection = function(direction) {
  this.direction = direction
}
dino.prototype.changeJump = function(flag) {
  this.isJump = flag
}