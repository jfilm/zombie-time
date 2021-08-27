import { Entity } from "./Entity";
import { Weapon } from "./Weapon";
const playerImg = document.getElementById('player');
export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 15, "blue", { x: 0, y: 0 });
        this.hp = 100;
        this.weapon;
 
    }

    updateWeapon() {
        this.weapon.playerX = this.x;
        this.weapon.playerY = this.y
    }

}


