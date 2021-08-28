import { Enemy } from "../Entities/Enemy";
import { Player } from "../Entities/Player";
import { Game } from "./Game";


/// An enum to handle game state
const gameState = {
  RUNNING: "running", // Game is playing
  PAUSED: "paused", // Game is paused
  WIN: "win", // Game is won
  LOSE: "lose", // Game is lost
  START: "start" // Start Screen
};

/// This class will recieve and delegate events,
/// As well as manage the viewport and game state
class GameManager {
  constructor(viewport, ctx) {
    this.viewport = viewport;
    this.ctx = ctx;
    this.game = new Game(viewport.width, viewport.height);

    // Game state may be: RUNNING, PAUSED, WIN, LOSE, START
    this.state = gameState.RUNNING;
  }

  get width() {
    return this.viewport.width;
  }

  get height() {
    return this.viewport.height;
  }

  resetGame() {
    console.log("reset game");
    this.game = new Game(this.width, this.height);
    this.state = gameState.RUNNING;
  }

  draw() {
    if (this.state == gameState.RUNNING) {
      this.game.draw(this.ctx);
    }
  }

  update() {
    if (this.state === gameState.RUNNING) {
      this.state = this.game.update();
    }
  }

  keyDown(event) {
    // Handle the escape key
    if (event.keyCode === 27) {
      if (this.state === gameState.PAUSED) {
        this.state = gameState.RUNNING;
      } else if (this.state === gameState.RUNNING) {
        this.state = gameState.PAUSED;
      }
    }

    if (this.state === gameState.RUNNING) {
      this.game.handleKeyDown(event);
    }
  }

  keyUp(event) {
    if (this.state === gameState.RUNNING) {
      this.game.handleKeyUp(event);
    }
  }

  mouseMove(event) {
    if (this.state === gameState.RUNNING) {
      this.game.handleMouseMove(event);
    }
  }

  mouseClick(event) {
    if (this.state === gameState.RUNNING) {
      this.game.handleMouseClick(event)
    }
  }

  mouseUp(event) {
    if (this.state === gameState.RUNNING) {
      this.game.handleMouseUp(event)
    }
  }

  mouseDown(event) {
    if (this.state === gameState.RUNNING) {
      this.game.handleMouseDown(event)
    }
  }
}

export {
  GameManager,
  gameState
}