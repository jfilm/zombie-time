import { Entity } from "./Entity";

export class Projectile extends Entity {

    constructor(x, y, bulletSize, velocity) {
        super(x, y, bulletSize, "red", velocity);
    }

    
}