import { Entity } from "./Entity";

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 10, "blue", { x: 0, y: 0 });
    }
}


