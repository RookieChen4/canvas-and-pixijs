import { Wind } from './wind.js'
export class Drop {
    static max_speed = 5
    constructor(){
        this.color = {
            r: '255',
            g: '255',
            b: '255',
            a: '0.5'
          };
        this.rain_color = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')';
        this.rain_color_clear = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + 0 + ')';
        this.dpr = window.devicePixelRatio || 1;
        this.x = 0;
        this.y = 0;
        this.radius = Math.round(Math.random() * 2 + 1) * this.dpr;
        this.speed_x = 0;
        this.speed_y = 0;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // render once and cache
        let diameter = this.radius * 2;
        this.canvas.width = diameter;
        this.canvas.height = diameter;

        let grd = this.ctx.createRadialGradient(this.radius, this.radius , 1, this.radius, this.radius, this.radius);
        grd.addColorStop(0, this.rain_color);
        grd.addColorStop(1, this.rain_color_clear);
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, diameter, diameter);
    }
    init(x,y) {
        this.x = x;
        this.y = y;
        let angle = Math.random() * Math.PI - (Math.PI * 0.5);
        let speed = Math.random() * 5;
        this.speed_x = Math.sin(angle) * speed;
        this.speed_y = -Math.cos(angle) * speed;
    }
    update() {
        this.x += this.speed_x * 0.4;
        this.y += this.speed_y * 0.4;
        // apply gravity - magic number 0.3 represents a faked gravity constant
        this.speed_y += 0.3 * 0.4;
        // apply wind (but scale back the force)
        this.speed_x += 4 / 25 * 0.4;
        // this.x += this.speed_x * 0.4;
        // this.y += this.speed_y * 0.4;
        // // apply gravity - magic number 0.3 represents a faked gravity constant
        // this.speed_y += 0.3 * 0.4;
        // // apply wind (but scale back the force)
        // this.speed_x += Wind.wind / 25 * 0.4;
        // if (this.speed_x < -Drop.max_speed) {
        //     this.speed_x = -Drop.max_speed;
        // }else if (this.speed_x > Drop.max_speed) {
        //     this.speed_x = Drop.max_speed;
        // }
    }
}