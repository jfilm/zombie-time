import { bigZombie, Enemy, fastZombie, zombie } from "../Entities/Enemy";
import { healthPickup, shotgunPickup, pistolPickup, riflePickup } from "../Entities/Pickups";
import { Point2d } from "../Entities/Point2d";
import { randomInt } from "../utils";
import { RandomTable } from "./RandomTable";


// Feel free to rebalance these tables
const defaultTable = new RandomTable()
  .addItem(5, { pickup: healthPickup })
  .addItem(15, { enemy: zombie })
  .addItem(10, { enemy: fastZombie });

const strongerTable = new RandomTable()
  .addItem(10, { pickup: healthPickup })
  .addItem(5, { pickup: riflePickup })
  .addItem(5, { pickup: shotgunPickup })
  .addItem(5, { pickup: pistolPickup })
  .addItem(20, { enemy: zombie })
  .addItem(15, { enemy: fastZombie })
  .addItem(5, { enemy: bigZombie });

const strongestTable = new RandomTable()
  .addItem(10, { pickup: healthPickup })
  .addItem(5, { pickup: shotgunPickup })
  .addItem(5, { pickup: riflePickup })
  .addItem(5, { pickup: pistolPickup })
  .addItem(25, { enemy: zombie })
  .addItem(15, { enemy: fastZombie })
  .addItem(15, { enemy: bigZombie });

export class Wave {
  constructor(enemiesToKill, maxEnemies, maxPickups, spawnTable = defaultTable) {
    this.enemiesToKill = enemiesToKill;
    this.maxEnemies = maxEnemies;
    this.maxPickups = maxPickups;
    this.spawnTable = spawnTable;



  }

  getSpawn() {
    return this.spawnTable.roll();
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
  new Wave(10, 5, 5),
  new Wave(20, 10, 6),
  new Wave(30, 20, 7, strongerTable),
  new Wave(50, 20, 7, strongerTable),
  new Wave(50, 35, 9, strongestTable),
];

export class WaveSet {
  constructor(waves = defaultWaves) {
    this.waves = waves;
    this.waveCounter = 0;
    this.canSpawn = true;
  }

  get currentWave() {
    return this.waves[this.waveCounter];
  }

  spawn(enemyList, pickupList) {
    const maxEnemies = this.currentWave.maxEnemies;
    const maxPickups = this.currentWave.maxPickups;
    if (this.canSpawn) {
      const spawnedItem = this.currentWave.getSpawn();
      if (spawnedItem.pickup && maxPickups > pickupList.length) {
        const x = randomInt(viewport.width - 20);
        const y = randomInt(viewport.height - 20);
        const position = new Point2d(x, y);
        const pickup = spawnedItem.pickup(position);
        pickupList.push(pickup);
      } else if (spawnedItem.enemy && maxEnemies > enemyList.length) {

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

        const position = new Point2d(x, y);

        const enemy = spawnedItem.enemy(position);
        if (enemy) {
          enemyList.push(enemy);
        }

      }

      // Disable enemy spawning for 1 second
      this.canSpawn = false;
      setTimeout((function () {
        this.canSpawn = true;
      }).bind(this), 1000);
    }
  }

  get enemiesToKill() {
    return this.waves[this.waveCounter].enemiesToKill;
  }

  get finished() {
    return this.waveCounter >= this.waves.length;
  }

  get length() {
    return this.waves.length;
  }

  nextWave() {

    this.waveCounter++;
    if (this.waveCounter < this.waves.length) {
      document.dispatchEvent(new CustomEvent("notification", {
        detail: {
          waveNumber: this.waveCounter + 1
        }
      }))
    }


    // Set spawning off for 8 seconds
    this.canSpawn = false;
    setTimeout((function () {
      this.canSpawn = true;
    }).bind(this), 8000);
  }
}