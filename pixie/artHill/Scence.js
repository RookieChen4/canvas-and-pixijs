function Scence(stage) {
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
    this.hills[i].setViewportX(viewportX, delta += 0.1 )
  }
};

Scence.prototype.moveViewportXBy = function(units) {
    this.Dino.loop()
    let newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};
