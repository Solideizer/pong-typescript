export class Ball {
    constructor(canvas) {
        this.canvas = canvas;
        this.radius = 10;
        this.deltaX = 2;
        this.deltaY = -2;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff8000";
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.deltaX;
        this.y += this.deltaY;
    }
    reset() {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height / 2;
    }
}
