function CoinPool() {
    this.coins = []
}

CoinPool.prototype.createParallelCoins = function(x,y) {
    this.coins.forEach(it => {
        it.setPosition(x,y)
    })
}

CoinPool.prototype.addCoinSprites = function(amount) {
    for (var i = 0; i < amount; i++)
    {
      let coin = new Coin();
      this.coins.push(coin);
    }
};