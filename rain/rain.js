import { Drop } from './drop.js'
export class Rain {
  constructor(x,color) {
    this.height = 40;
    this.x = x
    this.y = Math.random() * -100;
    this.z = Math.random() * 0.5 + 0.5;
    this.color = color;
    this.speed = 20
    this.splashed = false;
    this.drop_pool = []
  }
  drop(ctx) {
    this.y += this.speed * this.z * 0.4;
		this.x += this.z * 4 ;
    ctx.moveTo(this.x, this.y);
		// magic number 1.5 compensates for lack of trig in drawing angled rain
		ctx.lineTo(this.x - 4 * this.z * 1.5, this.y - this.height * this.z);
  }
  splash() {
    for (var i=0; i<2; i++) {
      let drop = new Drop()
      drop.init(this.x);
			this.drop_pool.push(drop);
		}
  }
}