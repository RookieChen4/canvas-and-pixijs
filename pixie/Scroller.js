function Scroller(stage) {
    this.far = new Far()
    this.mid = new Mid()
    stage.addChild(this.far)
    stage.addChild(this.mid)

    this.viewportX = 0;
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