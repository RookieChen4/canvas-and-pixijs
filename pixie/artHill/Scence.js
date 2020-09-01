function Scence(stage) {
  this.x = 0;
  this.y = 0;
  this.width = 512;
  this.height = 241;
  this.viewportX = 0;
  this.vx = 0;
  this.hills = [];
  this.Dino = null;
  this.rect = null;
  this.createHills(stage)
}

Scence.prototype.createHills = function(stage) {
  for(let i = 1; i <= 6; i ++) {
    if(i == 5) {
      this.Dino = new dino()
      stage.addChild(this.Dino);
      this.rect = new Graphics();
      this.rect.beginFill(0xDE3249);
      this.rect.drawRect(0, 0, 50, 50);
      this.rect.endFill();
      this.rect.x = 200;
      this.rect.y = 156;
      app.stage.addChild(this.rect);
    }
    hill = new Hills('0' + i)
    this.hills.push(hill)
    stage.addChild(hill);
  }
}

Scence.prototype.setVX = function(vx) {
  this.vx = vx
}

Scence.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  let delta = 0.1
  for(let i = 1; i < 6; i ++) {
    this.hills[i].setViewportX(viewportX, delta += 0.25 )
  }
};

Scence.prototype.initDino = function() {
  this.Dino.move()
  this.Dino.isgrounded = false
  this.contain()
  let {hit,collision} = this.hitTestRectangle(this.Dino, this.rect)
  this.Dino.isHit = hit
  this.Dino.collision = collision
}

Scence.prototype.init = function() {
  this.initDino()
  this.moveViewportXBy(this.vx)
}

Scence.prototype.moveViewportXBy = function(units) {
  let newViewportX = this.viewportX + units;
  this.setViewportX(newViewportX);
};

Scence.prototype.controlDino = function(vx,direction,flag) {
  direction = direction || 'right';
  flag = flag || false;
  this.Dino.changeDirection(direction)
  flag&&(this.Dino.changeJump(flag))
  this.Dino.setVX(vx)
}

Scence.prototype.controlDinoJump = function(flag, vy) {
  flag = flag || false;
  this.Dino.changeJump(flag)
}

Scence.prototype.contain = function() {
  let collision;
  if (this.Dino.x < this.x + this.Dino.width/2) {
    this.Dino.x = this.x + this.Dino.width/2;
    collision = "left";
  }
  //Top
  if (this.Dino.y <= this.y) {
    this.Dino.vy = 0
    this.Dino.y = 24;
    collision = "top";
  }
  //Right
  if (this.Dino.x + this.Dino.width/2 > this.width) {
    this.Dino.x = this.width - this.Dino.width/2;
    collision = "right";
  }
  //Bottom
  if (this.Dino.y >= this.height) {
    this.Dino.y = this.height;
    collision = "bottom";
    this.Dino.isgrounded = true
  }
}

Scence.prototype.hitTestRectangle = function(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy,collision;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x;
  r1.centerY = r1.y - r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;
  
  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

        //There's definitely a collision happening
        hit = true;

        overlapX = combinedHalfWidths - Math.abs(vx);
        overlapY = combinedHalfHeights - Math.abs(vy);

        //The collision has occurred on the axis with the
        //*smallest* amount of overlap. Let's figure out which
        //axis that is

        if (overlapX >= overlapY) {
          //The collision is happening on the X axis
          //But on which side? vy can tell us

          if (vy > 0) {
            collision = "top";
            //Move the rectangle out of the collision
            r1.y = r1.y + overlapY;
          } else {
            collision = "bottom";
            //Move the rectangle out of the collision
            r1.y = r1.y - overlapY;
            this.Dino.isgrounded = true
          }
        } else {
          //The collision is happening on the Y axis
          //But on which side? vx can tell us

          if (vx > 0) {
            collision = "left";
            //Move the rectangle out of the collision
            r1.x = r1.x + overlapX;
          } else {
            collision = "right";
            //Move the rectangle out of the collision
            r1.x = r1.x - overlapX;
          }
        }
    } else {

        //There's no collision on the y axis
        hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return {hit,collision};
}
