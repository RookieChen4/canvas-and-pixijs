class Rain {
  constructor() {
    
  }
  splash() {
    if (!this.splashed) {
      this.splashed = true;
      var drops = demo.drops;
      var drop_pool = demo.drop_pool;
  
      for (var i=0; i<16; i++) {
        var drop = drop_pool.pop() || new Drop();
        drops.push(drop);
        drop.init(this.x);
      }
    }
  }
}