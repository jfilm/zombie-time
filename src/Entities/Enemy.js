import colors from "../utils/colors";
import { Entity } from "./Entity";
import { Point2d } from "./Point2d";
const zombieImg = document.querySelector('#zombie');

export class Enemy extends Entity {
    constructor(position, radius, color, speed, attack, health, points) {
        super(position, radius, color, speed, attack, health);
        this.points = points;
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

export function zombie(pos) {
    return new Enemy(pos, 10, colors.zombie, 0.8, 5, 5, 10);
}

export function bigZombie(pos) {
    return new Enemy(pos, 15, colors.bigZombie, 0.5, 15, 15, 20);
}

export function fastZombie(pos) {
    return new Enemy(pos, 10, colors.fastZombie, 1.2, 1, 5, 5);
}