export class Paddle {
  y: number;
  readonly width: number = 15;
  readonly height: number = 75;
  color: string = "#00f2ff";
  readonly speed: number = 3;
  private upPressed: boolean = false;
  private downPressed: boolean = false;

  constructor(private canvas: HTMLCanvasElement, public isAI: boolean = false) {
    this.y = (canvas.height - this.height) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(
      this.isAI ? this.canvas.width - this.width : 0,
      this.y,
      this.width,
      this.height
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.downPressed && this.y < this.canvas.height - this.height) {
      this.y += this.speed;
    } else if (this.upPressed && this.y > 0) {
      this.y -= this.speed;
    }
  }

  handleInput(e: KeyboardEvent, isDown: boolean) {
    if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
      this.upPressed = isDown;
    } else if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
      this.downPressed = isDown;
    }
  }

  setColor(newColor: string) {
    this.color = newColor;
  }
}
