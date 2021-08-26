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

    console.log("Hello")
    this.projectiles.forEach(projectile => {
      projectile.draw(this.ctx);
    });
  }

  update() {
    this.player.update();

    this.projectiles.forEach(projectile => {
      projectile.update();
    });
  }

  shoot(event) {
    //Calculate angle of projectile speed vector.
    const angle = Math.atan2(event.offsetY - this.height / 2, event.offsetX - this.width / 2);
    //Get speed by axis in form of object {x, y}
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    // Add new projectile to the array
    this.projectiles.push(new Projectile(this.width / 2, this.height / 2, 5, 'red', velocity))
  }
}