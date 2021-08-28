import { Enemy } from "../Entities/Enemy";
import { Player } from "../Entities/Player";
import { Point2d } from "../Entities/Point2d";
import { gameState } from "./GameManager";
import { Wave, WaveSet } from "./Wave";

// Arbitrary values, feel free to change
const waves = [20, 30, 35, 50, 80];
// const waves = [5];

/// This class will handle the actual game logic like managing entities
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.player = new Player(width / 2, height / 2);
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.waves = new WaveSet();
    this.enemiesKilled = 0;
    this.score = 0;

    this.inputs = {
      up: false,
      down: false,
      right: false,
      left: false,
    }
  }

  /// Draw all entities and GUI on the provided context
  draw(ctx) {
    this.clearScreen(ctx);
    this.player.draw(ctx);

    //Draw projectiles
    this.projectiles.forEach(projectile => {
      projectile.draw(ctx);
    });

    //Draw enemies
    this.enemies.forEach(enemy => {
      enemy.draw(ctx);
    });

    // Draw pickups
    this.pickups.forEach(pickup => {
      pickup.draw(ctx);
    })

    // Draw the GUI last so it rests on top of the entities
    this.drawGui(ctx);
  }

  clearScreen(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
  }

  drawGui(ctx) {
    this.drawHealthBar(ctx);
    this.drawWaveCounter(ctx);
    this.drawScore(ctx);
  }

  drawHealthBar(ctx) {
    const maxHP = 100;
    const currentHP = this.player.hp;

    // draw black boarder
    ctx.fillStyle = "black";
    ctx.fillRect(this.width - 114, this.height - 24, 104, 14);

    // Draw red "underside"
    ctx.fillStyle = "red";
    ctx.fillRect(this.width - 112, this.height - 22, maxHP, 10);

    // Draw Green "health"
    ctx.fillStyle = "green";
    ctx.fillRect(this.width - 112, this.height - 22, currentHP, 10);
  }

  drawScore(ctx) {
    ctx.font = "16 sans-serif";
    ctx.fillStyle = "black";

    ctx.fillText(`Score: ${this.score}`, this.width - 100, 20);
  }

  drawWaveCounter(ctx) {
    const wave = this.waves.waveCounter + 1;
    // console.log(this.waves.waveCounter);
    const maxWaves = this.waves.length;
    ctx.font = "16px sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText(`Wave ${wave}/${maxWaves}`, 10, 20)

    const enemiesRemaining = this.waves.enemiesToKill - this.enemiesKilled;
    ctx.fillText(`Enemies Remaining: ${enemiesRemaining}`, 10, 38)
  }

  /// Update all entities
  /// Returns the next game state
  update() {
    // Update players velocity and location
    this.player.update(this.inputs);
    // console.log(this.player.velocity);


    // Make sure player isn't out of bounds
    {
      const radius = this.player.radius;
      this.player.x = Math.min(this.width - radius, Math.max(0 + radius, this.player.x));
      this.player.y = Math.min(this.height - radius, Math.max(0 + radius, this.player.y));
    }

    //Update players Weapon
    // this.player.updateWeapon();


    // update projectiles
    this.projectiles.forEach(projectile => {
      projectile.update();
      this.enemies.forEach(enemy => {
        if (enemy.collidesWith(projectile)) {
          enemy.takeDamage(projectile.attack);
          projectile.takeDamage(10);
        }
      })
    });


    // Updating all enemies 
    this.enemies.forEach(enemy => {
      if (enemy.collidesWith(this.player)) {
        this.player.takeDamage(enemy.attack);
        return; // Prevents the zombie from moving into the character
      }
      enemy.findPlayer(this.player.position);
      enemy.update();
    });

    // check each pickup for collision
    this.pickups.forEach(pickup => {
      if (pickup.collidesWith(this.player)) {
        pickup.pickup(this.player);
        pickup.takeDamage(10);
      }
    })

    // Remove projectiles that are out of bounds
    this.projectiles = this.projectiles.filter(projectile => {
      return (
        projectile.x > 0 &&
        projectile.y > 0 &&
        projectile.x < this.width &&
        projectile.y < this.height &&
        projectile.hp > 0
      );
    });

    //Removing dead enemies
    this.enemies = this.enemies.filter(enemy => {
      const killed = enemy.hp <= 0;
      if (killed) {
        this.enemiesKilled++;
        this.score += enemy.points;
      }
      return !killed;
    });

    // Remove dead picksup
    this.pickups = this.pickups.filter(pickup => pickup.hp > 0);

    this.waves.spawnEnemies(this.enemies, this.pickups);

    // Check if wave is cleared
    if (this.waves.enemiesToKill <= this.enemiesKilled) {
      this.nextWave();
    }

    if (this.player.hp <= 0) {
      return gameState.LOSE;
    } else if (this.waves.finished) {
      return gameState.WIN;
    }

    return gameState.RUNNING;
  }

  nextWave() {
    this.enemies = [];
    this.projectiles = [];
    // Should we reset the players position?

    this.waves.nextWave();
    this.enemiesKilled = 0;
  }

  spawnEnemies() {
    // If spawning is disable, exit early
    if (!this.canSpawn) {
      return;
    }

    const radius = 20;
    let x;
    let y;

    // Assign a random coordinate that are on the boarder of the viewport
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : viewport.width + radius;
      y = Math.random() * viewport.height;
    } else {
      x = Math.random() * viewport.width;
      y = Math.random() < 0.5 ? 0 - radius : viewport.height + radius;

    }

    const enemy = new Enemy(x, y);


    this.enemies.push(enemy);

    // disable enemy spawning for 1 second
    this.canSpawn = false;
    const game = this;
    setTimeout(function () {
      game.canSpawn = true;
    }, 1000);
  }

  handleKeyDown({ keyCode }) {
    if (keyCode == 65 || keyCode == 37) {
      // KEY LEFT or KEY A
      this.inputs.left = true;
    } else if (keyCode == 87 || keyCode == 38) {
      // KEY UP or KEY W
      this.inputs.up = true;
    } else if (keyCode == 68 || keyCode == 39) {
      // KEY RIGHT or KEY D
      this.inputs.right = true;
    } else if (keyCode == 83 || keyCode == 40) {
      // KEY DOWN or KEY S
      this.inputs.down = true;
    }
  }

  handleKeyUp({ keyCode }) {
    if (keyCode == 65 || keyCode == 37) {
      // KEY LEFT or KEY A
      this.inputs.left = false;
    } else if (keyCode == 87 || keyCode == 38) {
      // KEY UP or KEY W
      this.inputs.up = false;
    } else if (keyCode == 68 || keyCode == 39) {
      // KEY RIGHT or KEY D
      this.inputs.right = false;
    } else if (keyCode == 83 || keyCode == 40) {
      // KEY DOWN or KEY S
      this.inputs.down = false;
    }
  }

  handleMouseMove({ offsetX, offsetY }) {
    const target = new Point2d(offsetX, offsetY)
    // this.player.weapon.setAimCoordinates(target, this.player.position)
  }

  handleMouseClick(event) {
    // const target = new Point2d(offsetX, offsetY);
    const projectile = this.player.weapon.shoot(event, this.player.position);
    if (projectile) {
      this.projectiles.push(projectile);
    }
  }
}

export {
  Game
};