import { Entity } from "./Entity";
const zombieImg = document.querySelector('#zombie');

export class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 15, "brown", { x: 0, y: 0 });
    }

    findPlayer(playerX, playerY) {
        //Calculate an angle of a projectile speed vector.
        const angle = Math.atan2(playerY - this.y, playerX - this.x);
        //Get speed by axis in form of an object {x, y}
        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }


    }


    draw(ctx) {
        //This code helps to see the border of an entity
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = this.color;
        // ctx.fill();

        //Draw and center the image
        ctx.drawImage(zombieImg, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

}