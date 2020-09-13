function Score() {
    PIXI.Container.call(this);
    this.x = app.screen.width - 100;
    this.y = 0;
    this.score = 0;
    this.richText = null
}

Score.prototype = Object.create(PIXI.Container.prototype);

Score.prototype.setText = function(score) {
    this.removeChild(this.richText);
    this.score = score
    this.richText = new Text(score);
    this.addChild(this.richText);
}