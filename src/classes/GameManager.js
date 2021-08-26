import { Player } from "./Player";
import { Projectile } from "./Projectile";

/// This class will handle all the game logic, 
/// from updating all entities to handling input events
export class GameManager{
  constructor(viewport, ctx) {
    this.viewport = viewport;
    this.ctx = ctx;
    this.player = new Player(viewport.width / 2, viewport.height / 2, 10, "green");
    this.projectiles = [];

    this.inputs = {
      up: false,
      down: false,
      right: false,
      left: false,
    }
  }

  get width() {
    return this.viewport.width;
  }

  get height() {
    return this.viewport.height;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.player.draw(this.ctx);

    this.projectiles.forEach(projectile => {
      projectile.draw(this.ctx);
    });
  }

  update() {
    const { right, left, up, down } = this.inputs;
    this.player.setVelocity(2 * (right - left), 2 * (down - up))
    this.player.update();

    this.projectiles.forEach(projectile => {
      projectile.update();
    });

    this.projectiles = this.projectiles.filter((projectile) => {
      return projectile.x > 0 && projectile.y > 0 && projectile.x < this.width && projectile.y < this.height;
    });
  }

  shoot(event) {
    //Calculate angle of projectile speed vector.
    const distance_x = event.offsetX - this.player.x;
    const distance_y = event.offsetY - this.player.y;
    const angle = Math.atan2(distance_y, distance_x);
    //Get speed by axis in form of object {x, y}
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    // Add new projectile to the array
    this.projectiles.push(new Projectile(this.player.x, this.player.y, 5, 'red', velocity))
  }

  keyDown(event) {
    if (event.keyCode == 65 || event.keyCode == 37) {
      // KEY LEFT or KEY A
      this.inputs.left = true;
    } else if (event.keyCode == 87 || event.keyCode == 38) {
      // KEY UP or KEY W
      this.inputs.up = true;
    } else if (event.keyCode == 68 || event.keyCode == 39) {
      // KEY RIGHT or KEY D
      this.inputs.right = true;
    } else if (event.keyCode == 83 || event.keyCode == 40) {
      // KEY DOWN or KEY S
      this.inputs.down = true;
    }
  }

  keyUp(event) {
    if (event.keyCode == 65 || event.keyCode == 37) {
      // KEY LEFT or KEY A
      this.inputs.left = false;
    } else if (event.keyCode == 87 || event.keyCode == 38) {
      // KEY UP or KEY W
      this.inputs.up = false;
    } else if (event.keyCode == 68 || event.keyCode == 39) {
      // KEY RIGHT or KEY D
      this.inputs.right = false;
    } else if (event.keyCode == 83 || event.keyCode == 40) {
      // KEY DOWN or KEY S
      this.inputs.down = false;
    }
  }
}