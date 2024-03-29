import { Ball } from "./ball";
import { Paddle } from "./paddle";

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ball: Ball;
  private playerPaddle: Paddle;
  private aiPaddle: Paddle;
  private gamePaused: boolean = false;

  constructor() {
    this.canvas = document.getElementById("pongCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.ball = new Ball(this.canvas);
    this.playerPaddle = new Paddle(this.canvas);
    this.aiPaddle = new Paddle(this.canvas, true);
    this.initInputHandlers();
    this.loop();
  }

  private initInputHandlers() {
    document.addEventListener(
      "keydown",
      (e) => this.playerPaddle.handleInput(e, true),
      false
    );
    document.addEventListener(
      "keyup",
      (e) => this.playerPaddle.handleInput(e, false),
      false
    );
  }

  private loop = () => {
    if (!this.gamePaused) {
      this.update();
      this.draw();
    }
    requestAnimationFrame(this.loop);
  };

  private update() {
    this.ball.update();
    this.playerPaddle.update();
    this.handleBallCollisions();
    this.aiMovement();
  }

  private drawArea() {
    this.ctx.beginPath();

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawArea();
    this.ball.draw(this.ctx);
    this.playerPaddle.draw(this.ctx);
    this.aiPaddle.draw(this.ctx);
  }

  private handleBallCollisions() {
    // Ball and wall collisions
    if (
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.canvas.height
    ) {
      this.ball.deltaY = -this.ball.deltaY;
    }

    // Ball and paddle collisions
    // Player paddle
    if (
      this.ball.x - this.ball.radius <= this.playerPaddle.width &&
      this.ball.y >= this.playerPaddle.y &&
      this.ball.y <= this.playerPaddle.y + this.playerPaddle.height
    ) {
      this.ball.deltaX = -this.ball.deltaX;

      this.playerPaddle.setColor("#3700ff"); // Change to the collision color

      setTimeout(() => {
        this.playerPaddle.setColor("#00f2ff"); // Reset to the original color
      }, 250); // Delay in milliseconds
    }

    // AI paddle
    if (
      this.ball.x + this.ball.radius >=
        this.canvas.width - this.aiPaddle.width &&
      this.ball.y >= this.aiPaddle.y &&
      this.ball.y <= this.aiPaddle.y + this.aiPaddle.height
    ) {
      this.ball.deltaX = -this.ball.deltaX;

      this.aiPaddle.setColor("#3700ff"); // Change to the collision color

      setTimeout(() => {
        this.aiPaddle.setColor("#00f2ff"); // Reset to the original color
      }, 250); // Delay in milliseconds
    }

    // Reset ball if it goes out of bounds
    if (
      this.ball.x + this.ball.radius < 0 ||
      this.ball.x - this.ball.radius > this.canvas.width
    ) {
      this.ball.reset();
    }
  }

  private aiMovement() {
    const middleOfPaddle = this.aiPaddle.y + this.aiPaddle.height / 2;
    if (middleOfPaddle < this.ball.y) {
      this.aiPaddle.y += this.aiPaddle.speed;
    } else if (middleOfPaddle > this.ball.y) {
      this.aiPaddle.y -= this.aiPaddle.speed;
    }
  }
}

new Game();
