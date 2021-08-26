import { Entity } from "./Entity";

export class Projectile extends Entity {

    constructor(x, y, velocity) {
        super(x, y, 5, "red", velocity);
    }
}