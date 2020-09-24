function ParticlePool() {
  this.Particles = []
  this.creatParticle()
}

ParticlePool.NUM_PARTICLES = 5

ParticlePool.prototype.creatParticle = function(){
  for (let i = 0; i < ParticlePool.NUM_PARTICLES; i++) {
      this.Particles.push(new Particle());
  }
}
