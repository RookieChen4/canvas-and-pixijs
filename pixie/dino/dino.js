function dino() {
    this.dinoId = resources["./DinoSpriteSheet.json"].textures;
    this.direction = 'right'
    this.dinoSprite = null;
    this.viewportX = 0;
    this.y = 0;
    this.idleIndex = 0
    this.moveIndex = 0
    this.vx = 0;
    this.vy = 0;
    this.isflip = false
}

dino.IDLEDELTA = 0.1
dino.MOVEDELTA = 0.2

dino.prototype.changeDirection = function(direction) {
    this.direction = direction
}

dino.prototype.idle = function() {
    this.idleIndex += dino.IDLEDELTA
    app.stage.removeChild(this.dinoSprite);
    this.dinoSprite = new Sprite(this.dinoId[`DinoSpriteSheet ${parseInt(this.idleIndex%3)}.png`]);
    this.dinoSprite.width = 24
    this.dinoSprite.height = 24
    this.dinoSprite.pivot.x = this.dinoSprite.width / 2;
    this.direction == 'left' ? this.dinoSprite.scale.x = -1 : '';
    app.stage.addChild(this.dinoSprite);
    this.dinoSprite.x = this.viewportX;
    this.dinoSprite.y = this.y;
}

dino.prototype.move = function() {
    if(this.moveIndex > 10) this.moveIndex = 4;
    this.moveIndex += dino.MOVEDELTA;
    app.stage.removeChild(this.dinoSprite);
    this.dinoSprite = new Sprite(this.dinoId[`DinoSpriteSheet ${parseInt(this.moveIndex)}.png`]);
    this.dinoSprite.width = 24
    this.dinoSprite.height = 24
    this.dinoSprite.pivot.x = this.dinoSprite.width / 2;
    this.direction == 'left' ? this.dinoSprite.scale.x = -1 : '';
    app.stage.addChild(this.dinoSprite);
    this.viewportX += this.vx;
    this.dinoSprite.x = this.viewportX;
    this.y += this.vy;
    this.dinoSprite.y = this.y;
}

dino.prototype.loop = function() {
    if(this.moveIndex > 10) this.moveIndex = 4;
    this.moveIndex += dino.MOVEDELTA;
    app.stage.removeChild(this.dinoSprite);
    this.dinoSprite = new Sprite(this.dinoId[`DinoSpriteSheet ${parseInt(this.moveIndex)}.png`]);
    this.dinoSprite.pivot.x = this.dinoSprite.width / 2;
    // this.dinoSprite.pivot.y = this.dinoSprite.height / 2;
    // this.dinoSprite.position.y = app.screen.height / 2 - this.dinoSprite.y/2;
    if(this.viewportX >= 600) {
        this.isflip = true
    } else if (this.viewportX == 0) {
        this.isflip = false
    }
    this.isflip ? (this.viewportX-=3,this.dinoSprite.scale.x = -1) : this.viewportX+=3;
    this.dinoSprite.x = this.viewportX
    app.stage.addChild(this.dinoSprite);
}