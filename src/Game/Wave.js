import { bigZombie, Enemy, fastZombie, zombie } from "../Entities/Enemy";
import { Point2d } from "../Entities/Point2d";
import { RandomTable } from "./RandomTable";

// Feel free to rebalance these tables
const defaultTable = new RandomTable().addItem(10,zombie).addItem(5, fastZombie);

const strongerTable = new RandomTable()
  .addItem(20,zombie)
  .addItem(15, fastZombie)
  .addItem(5, bigZombie);

const strongestTable = new RandomTable()
  .addItem(15,zombie)
  .addItem(15, fastZombie)
  .addItem(10, bigZombie);

export class Wave {
  constructor(enemiesToKill, maxEnemies, spawnTable = defaultTable) {
    this.enemiesToKill = enemiesToKill;
    this.maxEnemies = maxEnemies;
    this.spawnTable = spawnTable;
  }

  spawnEnemy(x, y) {
    const position = new Point2d(x, y);
    const enemy = this.spawnTable.roll();
    if (enemy) {
      return enemy(position);
    }
  }
}

const defaultWaves = [
  new Wave(10, 5),
  new Wave(20, 10),
  new Wave(30, 20, strongerTable),
  new Wave(50, 20, strongerTable),
  new Wave(50, 35, strongestTable),
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

      const enemy = this.waves[this.currentWave].spawnEnemy(x, y);
      if (enemy) {
        enemyList.push(enemy);
      }

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