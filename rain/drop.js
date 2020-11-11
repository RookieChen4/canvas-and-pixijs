export class Drop {
    constructor(){
        this.color = {
            r: '80',
            g: '175',
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
        var diameter = this.radius * 2;
        this.canvas.width = diameter;
        this.canvas.height = diameter;

        var grd = this.ctx.createRadialGradient(this.radius, this.radius , 1, this.radius, this.radius, this.radius);
        grd.addColorStop(0, this.rain_color);
        grd.addColorStop(1, this.rain_color_clear);
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, diameter, diameter);
    }
    init(x) {
        this.x = x;
        this.y = window.innerHeight;
        let angle = Math.random() * Math.PI - (Math.PI * 0.5);
        let speed = Math.random() * 5;
        this.speed_x = Math.sin(angle) * speed;
        this.speed_y = -Math.cos(angle) * speed;
    }
}