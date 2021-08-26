import { Entity } from "./Entity";
import { Weapon } from "./Weapon";
const playerImg = document.getElementById('player');
export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 15, "blue", { x: 0, y: 0 });
        this.hp = 100;
        this.weapon = new Weapon(x, y);
    }

    updateWeapon() {
        this.weapon.playerX = this.x;
        this.weapon.playerY = this.y
    }

    draw(ctx) {

        //This code helps to see the border of an entity
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();

        //Draw and center the image
        ctx.drawImage(playerImg, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}


