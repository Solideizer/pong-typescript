import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
class Game {
  constructor() {
    this.gamePaused = false;
    this.loop = () => {
      if (!this.gamePaused) {
        this.update();
        this.draw();
      }
      requestAnimationFrame(this.loop);
    };
    this.canvas = document.getElementById("pongCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.ball = new Ball(this.canvas);
    this.playerPaddle = new Paddle(this.canvas);
    this.aiPaddle = new Paddle(this.canvas, true);
    this.initInputHandlers();
    this.loop();
  }
  initInputHandlers() {
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
  update() {
    this.ball.update();
    this.playerPaddle.update();
    this.handleBallCollisions();
    this.aiMovement();
  }
  drawArea() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    this.ctx.closePath();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawArea();
    this.ball.draw(this.ctx);
    this.playerPaddle.draw(this.ctx);
    this.aiPaddle.draw(this.ctx);
  }

  handleBallCollisions() {
    this.ballAndWallCol();
    this.playerPaddleCol();
    this.aiPaddleCol();
    this.resetBall();
  }

  resetBall() {
    if (
      this.ball.x + this.ball.radius < 0 ||
      this.ball.x - this.ball.radius > this.canvas.width
    ) {
      this.ball.reset();
    }
  }

  aiPaddleCol() {
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
      }, 250);
    }
  }

  playerPaddleCol() {
    if (
      this.ball.x - this.ball.radius <= this.playerPaddle.width &&
      this.ball.y >= this.playerPaddle.y &&
      this.ball.y <= this.playerPaddle.y + this.playerPaddle.height
    ) {
      this.ball.deltaX = -this.ball.deltaX;
      this.playerPaddle.setColor("#3700ff"); // Change to the collision color
      setTimeout(() => {
        this.playerPaddle.setColor("#00f2ff"); // Reset to the original color
      }, 250);
    }
  }

  ballAndWallCol() {
    if (
      this.ball.y - this.ball.radius <= 0 ||
      this.ball.y + this.ball.radius >= this.canvas.height
    ) {
      this.ball.deltaY = -this.ball.deltaY;
    }
  }

  aiMovement() {
    const middleOfPaddle = this.aiPaddle.y + this.aiPaddle.height / 2;
    if (middleOfPaddle < this.ball.y) {
      this.aiPaddle.y += this.aiPaddle.speed;
    } else if (middleOfPaddle > this.ball.y) {
      this.aiPaddle.y -= this.aiPaddle.speed;
    }
  }
}
new Game();
