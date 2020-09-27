function Particle() {
  this.vx = 0;
  this.vy = 0;
  this.x = -2;
  this.y = -2;
  this.diameter;
  this.duration;
  this.amplitude;
  this.offsetY;
  this.arc;
  this.startTime;
  this.color;
  this.fillcolor = ''
  this.initParticle()
}

Particle.PARTICLE_SIZE = 0.5; // View heights
Particle.SPEED = 20000; // Milliseconds

Particle.prototype.initParticle = function() {
  this.diameter =  Math.max(0, this.randomNormal({ mean: Particle.PARTICLE_SIZE, dev: 0 }))//半径
  this.initColor()
  this.initPosition()
}

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
  this.duration = this.randomNormal({ mean: Particle.SPEED, dev: Particle.SPEED * 0.1 })
  this.amplitude = this.randomNormal({ mean: 16, dev: 2 }) //振幅
  this.offsetY = this.randomNormal({ mean: 0, dev: 10 })
  this.arc = Math.PI * 2 // 移动路径相关
  this.x = this.randomNormal({ mean: window.innerWidth/2, dev: 100 })
  this.y = this.randomNormal({ mean: window.innerHeight/2, dev: 100 })
  // this.x = 30 + (Math.random() * (window.innerWidth - 40));
  // this.y = 30 + (Math.random() * (window.innerHeight - 40));
  this.vx = this.rand(-2,2)
  this.vy = this.rand(-2,2)
}

Particle.prototype.randomNormal = function(o) {
  let r, a, n, e, l = o.mean,t = o.dev;
  do {
      r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n
  } while (r >= 1);
  return e = a * Math.sqrt(-2 * Math.log(r) / r), t * e + l
}

Particle.prototype.rand = function(low, high) {
  return Math.random() * (high - low) + low;
}
