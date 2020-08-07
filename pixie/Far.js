//@ts-nocheck
function Far(texture, width, height) {
    PIXI.TilingSprite.call(this, texture, width, height);
}

Far.prototype = Object.create(PIXI.TilingSprite.prototype);