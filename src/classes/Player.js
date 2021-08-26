import { Entity } from "./Entity";
import { Weapon } from "./Weapon";

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 10, "blue", { x: 0, y: 0 });
        this.hp = 100;
        this.weapon = new Weapon(x, y);
    }

    updateWeapon() {
        this.weapon.playerX = this.x;
        this.weapon.playerY = this.y
    }
}


