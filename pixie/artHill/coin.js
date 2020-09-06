function Coin() {
    PIXI.Container.call(this);
    this.coinSprite = null;
    this.coins = [];
    this.index = 0;
    this.texture = PIXI.utils.TextureCache["./MonedaD.png"];
    for(let i = 0; i < 5; i++) {
        let rectangle = new PIXI.Rectangle(i*16, 0, 16, 16);
        this.coins.push(rectangle)
    }
}

Coin.DELTA = 0.25

Coin.prototype = Object.create(PIXI.Container.prototype);

Coin.prototype.createCoin = function() {
    this.index += Coin.DELTA;
    this.removeChild(this.coinSprite);
    this.texture.frame = this.coins[parseInt(this.index%5)]
    this.coinSprite = new Sprite(this.texture)
    this.addChild(this.coinSprite);
}