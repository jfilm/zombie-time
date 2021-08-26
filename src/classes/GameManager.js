import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Projectile } from "./Projectile";

/// This class will handle all the game logic, 
/// from updating all entities to handling input events
export class GameManager {
  constructor(viewport, ctx) {
    this.viewport = viewport;
    this.ctx = ctx;
    this.player = new Player(viewport.width / 2, viewport.height / 2);
    this.projectiles = [];
    this.enemies = [];

    // spawn some random enemies with interval
    setInterval(() => {
      const radius = 20;
      let x;
      let y;
      // Assign random coordinate just out of the viewport
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : viewport.width + radius;
        y = Math.random() * viewport.height;
      } else {
        x = Math.random() * viewport.width;
        y = Math.random() < 0.5 ? 0 - radius : viewport.height + radius;

      }
      //Calculate angle of projectile speed vector.
      const angle = Math.atan2(viewport.height / 2 - y, viewport.width / 2 - x);
      //Get speed by axis in form of object {x, y}
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }

      const enemy = new Enemy(x, y);
      enemy.velocity = velocity;

      this.enemies.push(enemy)
      // console.log(enemies);
    }, 1000)



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

    this.enemies.forEach(enemy => {
      enemy.draw(this.ctx)
      if (enemy.collidesWith(this.player)) {
        this.player.takeDamage(10);
      }
    });

    this.drawHealthBar();
  }

  drawHealthBar() {
    const maxHP = 100;
    const currentHP = this.player.hp;

    // draw black boarder
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.width - 114, this.height - 24, 104, 14);

    // Draw red "underside"
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.width - 112, this.height - 22, maxHP, 10);

    // Draw Green "health"
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(this.width - 112, this.height - 22, currentHP, 10);
  }

  update() {
    // Update players velocity and location
    const { right, left, up, down } = this.inputs;
    this.player.setVelocity(1 * (right - left), 1 * (down - up))
    this.player.update();


    // Make sure player isn't out of bounds
    {
      const radius = this.player.radius;
      this.player.x = Math.min(this.width - radius, Math.max(0 + radius, this.player.x));
      this.player.y = Math.min(this.height - radius, Math.max(0 + radius, this.player.y));
    }

    // update projectiles
    this.projectiles.forEach(projectile => {
      projectile.update();
      this.enemies.forEach(enemy => {
        if (enemy.collidesWith(projectile)) {
          enemy.takeDamage(10);
          projectile.takeDamage(10);
        }
      })
    });

    // Remove offscreen and damaged projectiles
    this.projectiles = this.projectiles.filter((projectile) => {
      return projectile.x > 0 && projectile.y > 0 && projectile.x < this.width && projectile.y < this.height && projectile.hp > 0;
    });

    //Removing dead enemies
    this.enemies = this.enemies.filter(enemy => enemy.hp > 0);
    // Updating all enemies and 
    this.enemies.forEach(enemy => {
      enemy.findPlayer(this.player.x, this.player.y)
      enemy.update()
    })
  }

  shoot(event) {
    //Calculate angle of projectile speed vector.
    const distance_x = event.offsetX - this.player.x;
    const distance_y = event.offsetY - this.player.y;
    const angle = Math.atan2(distance_y, distance_x);
    //Get speed by axis in form of object {x, y}
    const velocity = {
      x: 2 * Math.cos(angle),
      y: 2 * Math.sin(angle)
    }
    // Add new projectile to the array
    this.projectiles.push(new Projectile(this.player.x, this.player.y, velocity));
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