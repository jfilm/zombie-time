import { Entity } from "./Entity";
import { Point2d } from "./Point2d";

export class Projectile extends Entity {
    constructor(position, bulletSize, speed = 5, direction = new Point2d(), bulletDamage, bulletHealth) {
        super(position, bulletSize, "red", speed, bulletDamage, bulletHealth);
        this.velocity = direction.scale(speed);
    }
}