import { hitHowl } from "../Game/sounds";
import colors from "../utils/colors";
import { Entity } from "./Entity";
import { Point2d } from "./Point2d";
import { pistol, shotgun, Weapon } from "./Weapon";
import image from "../assets/images/player/womanGreen_gun.png"
import { cursorCoordinates } from "../utils/cursorCoordinates";

// const playerImg = document.getElementById('player');

export const playerMaxHP = 100;

export class Player extends Entity {
    constructor(x, y) {
        const img = new Image();
        img.src = image;
        img.width = 20;
        img.height = 20;
        super(new Point2d(x, y), 10, colors.player, 1, 0, playerMaxHP, img);
        this.weapon = pistol;
        this.weapon.playerPos = this.position;
        this.invincible = false;
    }

    update({ right, left, up, down }) {
        
        const vX = (right - left);
        const vY = (down - up);
        if (vX || vY) {
            this.velocity = new Point2d(vX, vY).normal().scale(this.speed);
        } else {
            this.velocity = new Point2d();
        }
        
        // calculate the direction the player face based on cursor
        const cursoorCoordinates = cursorCoordinates();
        this.direction = Math.atan2(cursoorCoordinates.y - this.y, cursoorCoordinates.x - this.x);

        //Updates weapon position
        this.weapon.playerPos = this.position;

        this.position = this.position.add(this.velocity);
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

            //hit sound
            hitHowl.play();

        }
    }
}


