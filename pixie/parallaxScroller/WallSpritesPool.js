function WallSpritesPool() {
    this.id = resources["./wall.json"].textures;
    this.createWindows();
}

WallSpritesPool.prototype.createWindows = function() {
    this.windows = [];
  
    this.addWindowSprites(6, "window_01");
    this.addWindowSprites(6, "window_02");
  
    this.shuffle(this.windows);
};

WallSpritesPool.prototype.addWindowSprites = function(amount, frameId) {
    for (var i = 0; i < amount; i++)
    {
      var sprite = new Sprite(this.id[frameId]);
      this.windows.push(sprite);
    }
};

WallSpritesPool.prototype.shuffle = function(array) {
    var len = array.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++)
    {
      var wallSlice = array.pop();
      var pos = Math.floor(Math.random() * (len-1));
      array.splice(pos, 0, wallSlice);
    }
};

WallSpritesPool.prototype.borrowWindow = function() {
    return this.windows.shift();
};

WallSpritesPool.prototype.returnWindow = function(sprite) {
    this.windows.push(sprite);
};