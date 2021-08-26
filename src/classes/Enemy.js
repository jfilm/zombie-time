import { Entity } from "./Entity";

export class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 7, "brown", { x: 0, y: 0 });
    }

    findPlayer(playerX, playerY) {
        //Calculate angle of projectile speed vector.
        const angle = Math.atan2(playerY - this.y, playerX - this.x);
        //Get speed by axis in form of object {x, y}
        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }


    }
}