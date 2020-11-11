export class Rain {
  constructor(color) {
    this.height = 40;
    this.x = Math.random();
    this.y = Math.random() * -100;
    this.z = Math.random() * 0.5 + 0.5;
    this.color = color;
    this.speed = 20
    this.splashed = false;
  }
  drop(ctx) {
    this.y += this.speed * this.z;
		this.x += this.z * 4 * this.speed;
    ctx.moveTo(this.x, this.y);
		// magic number 1.5 compensates for lack of trig in drawing angled rain
		ctx.lineTo(this.x - 4 * this.z * 1.5, this.y - this.height * this.z);
  }
}