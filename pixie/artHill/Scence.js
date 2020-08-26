function Scence(stage) {
  this.x = 0;
  this.y = 0;
  this.width = 512;
  this.height = 241;
  this.viewportX = 0;
  this.hills = [];
  this.Dino = null;
  this.createHills(stage)
}

Scence.prototype.createHills = function(stage) {
  for(let i = 1; i <= 6; i ++) {
    if(i == 5) {
      this.Dino = new dino()
      stage.addChild(this.Dino);
    }
    hill = new Hills('0' + i)
    this.hills.push(hill)
    stage.addChild(hill);
  }
}

Scence.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  let delta = 0.1
  for(let i = 1; i < 6; i ++) {
    this.hills[i].setViewportX(viewportX, delta += 0.25 )
  }
};

Scence.prototype.moveViewportXBy = function(units) {
    this.Dino.move()
    this.contain()
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

Scence.prototype.controlDinoJump = function(flag) {
  flag = flag || false;
  this.Dino.changeJump(flag)
}

Scence.prototype.contain = function() {
  if (this.Dino.x < this.x + this.Dino.width/2) {
    this.Dino.x = this.x + this.Dino.width/2;
    collision = "left";
  }
  //Top
  if (this.Dino.y < this.y) {
    this.Dino.y = this.y;
    collision = "top";
  }
  //Right
  if (this.Dino.x + this.Dino.width/2 > this.width) {
    this.Dino.x = this.width - this.Dino.width/2;
    collision = "right";
  }
  //Bottom
  if (this.Dino.y > this.height) {
    this.Dino.y = this.height;
    collision = "bottom";
  }
}
