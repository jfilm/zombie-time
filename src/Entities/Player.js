import colors from "../utils/colors";
import { Entity } from "./Entity";
import { Point2d } from "./Point2d";
import { pistol, shotgun, Weapon } from "./Weapon";

// const playerImg = document.getElementById('player');

export const playerMaxHP = 100;

export class Player extends Entity {
    constructor(x, y) {
        super(new Point2d(x, y), 10, colors.player, 2, 0, playerMaxHP);
        this.weapon = pistol;
        this.invincible = false;
    }

    update({ right, left, up, down }) {
        const vX = (right - left);
        const vY = (down - up);
        if (vX || vY ) {
            this.velocity = new Point2d(vX, vY).normal().scale(this.speed);
        } else {
            this.velocity = new Point2d();
        }

        this.position = this.position.add(this.velocity)
    }

    takeDamage(damage) {
        if (!this.invincible) {
          this.hp -= damage;
          this.hp = Math.max(this.hp, 0);
    
          // Turn on "invincibility frames"
          this.invincible = true;
          const originalColor = this.color;
          this.color = "red";
    
          // Turn off "invincibility frames"
          setTimeout(() => {
            this.invincible = false;
            this.color = originalColor;
          }, 400);
        }
    }
}


