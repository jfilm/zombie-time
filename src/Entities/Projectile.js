import { Entity } from "./Entity";
import { Point2d } from "./Point2d";

export class Projectile extends Entity {
    constructor(position, bulletSize, speed = 5, direction = new Point2d()) {
        super(position, bulletSize, "red", speed);
        this.velocity = direction.scale(speed);
    }
}