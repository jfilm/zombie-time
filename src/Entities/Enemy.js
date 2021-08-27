import { Entity } from "./Entity";
import { Point2d } from "./Point2d";
const zombieImg = document.querySelector('#zombie');

export class Enemy extends Entity {
    constructor(x, y) {
        super(new Point2d(x, y), 15, "brown", 0.7);
    }

    findPlayer(playerPos) {
        //Calculate an angle of a projectile speed vector.
        const angle = Math.atan2(playerPos.y - this.y, playerPos.x - this.x);
        //Get speed by axis in form of an object {x, y}
        const newVelocity = new Point2d(Math.cos(angle), Math.sin(angle)).scale(this.speed);
        this.velocity = newVelocity;
    }


    // draw(ctx) {
    //     //This code helps to see the border of an entity
    //     // ctx.beginPath();
    //     // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //     // ctx.fillStyle = this.color;
    //     // ctx.fill();

    //     //Draw and center the image
    //     ctx.drawImage(zombieImg, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    // }

}