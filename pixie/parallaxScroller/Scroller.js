function Scroller(stage) {
    this.far = new Far()
    this.mid = new Mid()
    this.front = new Walls()
    stage.addChild(this.far)
    stage.addChild(this.mid)
    stage.addChild(this.front);

    this.viewportX = 0;  //初始化viewportX
}

// Scroller.prototype.update = function() {
//     this.far.update();
//     this.mid.update();
// }

Scroller.prototype.setViewportX = function(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
    return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
    let newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
};