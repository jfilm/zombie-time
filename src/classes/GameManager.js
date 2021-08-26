import { Enemy } from "./Enemy";
import { Player } from "./Player";

const waves = [20, 30, 35, 50, 80];

/// This class will handle all the game logic, 
/// from updating all entities to handling input events
export class GameManager {
  constructor(viewport, ctx) {
    this.viewport = viewport;
    this.ctx = ctx;
    this.player = new Player(viewport.width / 2, viewport.height / 2);
    this.enemies = [];
    this.waves = waves;
    this.waveCounter = 0;
    this.enemiesKilled = 0;

    // Game state may be: "running", "paused", "win", "lose" 
    this.state = "running"

    // spawn some random enemies with an interval
    setInterval(() => {
      const radius = 20;
      let x;
      let y;
      // Assign a random coordinate just out of the viewport
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : viewport.width + radius;
        y = Math.random() * viewport.height;
      } else {
        x = Math.random() * viewport.width;
        y = Math.random() < 0.5 ? 0 - radius : viewport.height + radius;

      }
      //Calculate an angle of a projectile speed vector.
      const angle = Math.atan2(viewport.height / 2 - y, viewport.width / 2 - x);
      //Get speed by axis in form of object {x, y}
      const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
      }

      const enemy = new Enemy(x, y);
      enemy.velocity = velocity;

      this.enemies.push(enemy)
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

    //Draw projectiles
    this.player.weapon.projectiles.forEach(projectile => {
      projectile.draw(this.ctx);
    });

    //Draw a weapon aim
    this.player.weapon.drawAim(this.ctx)

    //Draw enemies
    this.enemies.forEach(enemy => {
      enemy.draw(this.ctx)
      if (enemy.collidesWith(this.player)) {
        this.player.takeDamage(10);
      }
    });

    this.drawHealthBar();
    this.drawWaveCounter();

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

  drawWaveCounter() {
    const wave = this.waveCounter + 1;
    const maxWaves = this.waves.length;
    this.ctx.font = "16px sans-serif"
    this.fillStyle = "black";
    this.ctx.fillText(`Wave ${wave}/${maxWaves}`, 10, 20)

    const enemiesRemaining = this.waves[this.waveCounter] - this.enemiesKilled;
    this.ctx.fillText(`Enemies Remaining: ${enemiesRemaining}`, 10, 38)
  }

  update() {

    // Check players hp, and if it is less then 0, then sets the game state to a condition "lose"
    if (this.player.hp <= 0) {
      this.state = 'lose'
      return;
    } else if (this.waveCounter >= this.waves.length) {
      this.state = 'win';
      return;
    }

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

    //Update players Weapon
    this.player.updateWeapon();


    // update projectiles
    this.player.weapon.projectiles.forEach(projectile => {
      projectile.update();
      this.enemies.forEach(enemy => {
        if (enemy.collidesWith(projectile)) {
          enemy.takeDamage(10);
          projectile.takeDamage(10);
        }
      })
    });

    // Remove offscreen and damaged projectiles
    this.player.weapon.updateProjectiles(this.width, this.height);


    // Updating all enemies and 
    this.enemies.forEach(enemy => {
      enemy.findPlayer(this.player.x, this.player.y)
      enemy.update()
    })

    //Removing dead enemies
    this.enemies = this.enemies.filter(enemy => {
      const remove = enemy.hp <= 0;
      if (remove) {
        this.enemiesKilled++;
      }
      return !remove;
    });

    // Check if wave is cleared
    if (this.waves[this.waveCounter] <= this.enemiesKilled) {
      this.resetWave();
    }
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

  resetWave() {
    this.enemies = [];
    this.player.weapon.projectiles = [];
    // Should we reset the players position?

    this.waveCounter++;
    this.enemiesKilled = 0;
  }
}