export class Paddle {
    constructor(canvas, isAI = false) {
        this.canvas = canvas;
        this.isAI = isAI;
        this.width = 15;
        this.height = 75;
        this.color = "#00f2ff";
        this.speed = 3;
        this.upPressed = false;
        this.downPressed = false;
        this.y = (canvas.height - this.height) / 2;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.isAI ? this.canvas.width - this.width : 0, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    update() {
        if (this.downPressed && this.y < this.canvas.height - this.height) {
            this.y += this.speed;
        }
        else if (this.upPressed && this.y > 0) {
            this.y -= this.speed;
        }
    }
    handleInput(e, isDown) {
        if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
            this.upPressed = isDown;
        }
        else if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
            this.downPressed = isDown;
        }
    }
    setColor(newColor) {
        this.color = newColor;
    }
}
