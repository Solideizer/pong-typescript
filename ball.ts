export class Ball {
  x: number;
  y: number;
  readonly radius: number = 10;
  deltaX: number = 2;
  deltaY: number = -2;

  constructor(private canvas: HTMLCanvasElement) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
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
