function Scence(stage) {
  this.x = 0;
  this.y = 0;
  this.width = 928;
  this.height = 763;
  this.viewportX = 0;
  this.forests = [];
  this.createForest(stage)
}

Scence.prototype.createForest = function(stage) {
  for(let i = 1; i <= 11; i ++) {
    forest = new Forest(i)
    this.forests.push(forest)
    stage.addChild(forest);
  }
}

Scence.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  let delta = 0.1
  for(let i = 1; i < 11; i ++) {
    this.forests[i].setViewportX(viewportX, delta += 0.25 )
  }
};

Scence.prototype.moveViewportXBy = function(units) {
    let newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};
