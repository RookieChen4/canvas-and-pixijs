function Walls() {
    PIXI.Container.call(this);
    this.pool = new WallSpritesPool();
    this.createLookupTables();

    console.log("Before borrowing window: " + this.pool.windows.length);
    var sprite = this.borrowWallSprite(SliceType.WINDOW);
    this.addChild(sprite);
    console.log("After borrowing window: " + this.pool.windows.length);

    this.removeChild(sprite);
    this.returnWallSprite(SliceType.WINDOW, sprite);
    console.log("After returning window: " + this.pool.windows.length);
}
  
Walls.prototype = Object.create(PIXI.Container.prototype);

Walls.prototype.createLookupTables = function() {
    this.borrowWallSpriteLookup = [];
    this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
    this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
    this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
    this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
    this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;
  
    this.returnWallSpriteLookup = [];
    this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
    this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
    this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
    this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
    this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};

Walls.prototype.borrowWallSprite = function(sliceType) {
    return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};
  
Walls.prototype.returnWallSprite = function(sliceType, sliceSprite) {
    return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};