import { bigZombie, Enemy, fastZombie, zombie } from "../Entities/Enemy";


export class Wave {
  constructor(enemiesToKill, maxEnemies) {
    this.enemiesToKill = enemiesToKill;
    this.maxEnemies = maxEnemies;
  }
}

const defaultWaves = [
  new Wave(10, 5),
  new Wave(20, 10),
  new Wave(30, 20),
  new Wave(50, 20),
  new Wave(50, 35),
];

export class WaveSet {
  constructor(waves = defaultWaves) {
    this.waves = waves;
    this.currentWave = 0;
    this.canSpawn = true;
  }

  spawnEnemies(enemyList) {
    const maxEnemies = this.waves[this.currentWave].maxEnemies;
    if (this.canSpawn && enemyList.length < maxEnemies) {
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

      const chance = Math.random();
      console.log(chance);
      let enemy;
      if (chance < 0.15) {
        enemy = bigZombie(x, y);
      } else if (chance < 0.35) {
        enemy = fastZombie(x, y);
      } else {
        enemy = zombie(x, y);
      }
      enemyList.push(enemy);

      // Disable enemy spawning for 1 second
      this.canSpawn = false;
      setTimeout((function() {
        this.canSpawn = true;
      }).bind(this), 1000);
    }
  }

  get enemiesToKill() {
    return this.waves[this.currentWave].enemiesToKill;
  }

  get finished() {
    return this.currentWave >= this.waves.length;
  }

  get length() {
    return this.waves.length;
  }

  nextWave() {
    this.currentWave++;
    
    // Set spawning off for 8 seconds
    this.canSpawn = false;
    setTimeout((function() {
      this.canSpawn = true;
    }).bind(this), 8000);
  }
}