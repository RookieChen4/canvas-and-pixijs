function Particle() {
    this.x = 0;
    this.y = 0;
    this.color = {}
    this.fillcolor = ''
    this.initColor()
    this.initPosition()
}

Particle.PARTICLE_SIZE = 0.5; // View heights

Particle.prototype.initColor = function() {
    this.color = {
        r: 255,
        g: this.randomNormal({ mean: 125, dev: 20 }),
        b: 50,
        a: this.rand(0, 1)
    }
    this.fillcolor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`
}

Particle.prototype.initPosition = function() {
    this.x = this.randomNormal({ mean: 810, dev: 20 });
    this.y = this.randomNormal({ mean: 590, dev: 20 });
}

Particle.prototype.randomNormal = function(o) {
    if (o = Object.assign({mean: 0, dev: 1, pool: []}, o), Array.isArray(o.pool) && o.pool.length > 0) return normalPool(o);
    let r, a, n, e, l = o.mean,t = o.dev;
    do {
        r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n
    } while (r >= 1);
    return e = a * Math.sqrt(-2 * Math.log(r) / r), t * e + l
}


Particle.prototype.rand = function(low, high) {
    return Math.random() * (high - low) + low;
  }
