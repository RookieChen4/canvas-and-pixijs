function dino() {
  PIXI.Container.call(this);
  this.dinoId = resources["./DinoSpriteSheet.json"].textures;
  this.dinoSprite = null;
  this.idleIndex = 0;
  this.moveIndex = 0;
  this.x = 20;
  this.y = 241;
  this.vx = 0;
  this.vy = 8;
  this.direction = 'right'
  this.isJump = false
  this.isgrounded = true
  this.isHit = false
  this.collision = ''
}

dino.prototype = Object.create(PIXI.Container.prototype);

dino.IDLEDELTA = 0.1
dino.MOVEDELTA = 0.2
dino.JUMPSPEED = 6
dino.GRAVITY = 0.25

dino.prototype.setX = function(x) {
  this.x = x;
}

dino.prototype.setY = function(y) {
  this.y = y;
}

dino.prototype.Idleloop = function() {
    this.idleIndex += dino.IDLEDELTA
    this.removeChild(this.dinoSprite);
    this.dinoSprite = new Sprite(this.dinoId[`DinoSpriteSheet ${parseInt(this.idleIndex%3)}.png`]);
    this.dinoSprite.width = 24
    this.dinoSprite.height = 24
    this.dinoSprite.pivot.x = this.dinoSprite.width / 2;
    this.dinoSprite.pivot.y = this.dinoSprite.height;
    this.direction == 'left' ? this.dinoSprite.scale.x = -1 : '';
    this.addChild(this.dinoSprite);
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
  this.vx ? this.Moveloop() : this.Idleloop()
  // if(this.collision == 'left' || this.collision == 'right') this.vx = 0;
  if(!this.isJump) {
    if(this.collision == 'top' || this.collision == 'bottom') {this.vy = 0;}
  }
  this.x += this.vx;
  // if(this.isgrounded) {
  //   this.isJump = false
  // }
  // if(this.isJump) {
  //   this.y -= (this.vy -= dino.GRAVITY)
  // }
  this.y -= (this.vy -= dino.GRAVITY)
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