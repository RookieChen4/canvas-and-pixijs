//@ts-nocheck
function Far() {
    let texture = PIXI.Texture.from("./bg-far.png");
    PIXI.TilingSprite.call(this, texture, 512, 256);

    this.position.x = 0
    this.position.y = 0
    this.tilePosition.x = 0
    this.tilePosition.y = 0

    this.viewportX = 0;
}

Far.prototype = Object.create(PIXI.TilingSprite.prototype);

// Far.prototype.update = function() {
//     this.tilePosition.x -= 0.128
// }
Far.DELTA_X = 0.128;
Far.prototype.setViewportX = function(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};