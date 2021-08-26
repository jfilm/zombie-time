import { Entity } from "./Entity";

export class Enemy extends Entity {
    constructor(x, y) {
        super(x, y, 7, "brown", { x: 0, y: 0 });
    }
}