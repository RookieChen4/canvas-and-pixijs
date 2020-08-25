//@ts-nocheck
function hills01() {
    let texture = PIXI.Texture.from("./Hills Layer 01.png");
    PIXI.TilingSprite.call(this, texture, 512, 256);

    this.position.x = 0
    this.position.y = 0
    this.tilePosition.x = 0
    this.tilePosition.y = 0

    this.viewportX = 0;
}

hills01.prototype = Object.create(PIXI.TilingSprite.prototype);

hills01.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled);
};