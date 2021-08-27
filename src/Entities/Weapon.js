import { Point2d } from "./Point2d";
import { Projectile } from "./Projectile";




export class Weapon {
    constructor(bulletSize = 5, bulletSpeed = 3, bulletDamage = 10, bulletHealth = 10, accuracy = 0.9) {
        this.bulletSize = bulletSize;
        this.bulletSpeed = bulletSpeed;
        this.bulletDamage = bulletDamage;
        this.bulletHealth = bulletHealth;
        this.accuracy = accuracy; // TODO: add random spread based on `accuracy`

        this.aim = {
            x: 0,
            y: 0,
            radius: 70,
            color: 'yellow',
        }
    }

    shoot(event, playerPos) {
        //Calculate angle of projectile speed vector.
        const distance_x = event.offsetX - playerPos.x;
        const distance_y = event.offsetY - playerPos.y;
        const angle = Math.atan2(distance_y, distance_x);
        //Get speed by axis in form of object {x, y}
        const direction = new Point2d(Math.cos(angle), Math.sin(angle));
        return new Projectile(playerPos, this.bulletSize, this.bulletSpeed, direction, this.bulletDamage, this.bulletHealth);
    }

    setAimCoordinates(target, playerCoordinates) {
        const dx = target.x - playerCoordinates.x
        const dy = target.y - playerCoordinates.y

        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > this.aim.radius) {
            this.aim.x = ((dx * this.aim.radius) / distance) + playerCoordinates.x;
            this.aim.y = ((dy * this.aim.radius) / distance) + playerCoordinates.y;
        } else {
            this.aim.x = event.offsetX;
            this.aim.y = event.offsetY;
        }
    }

    drawAim(ctx) {
        ctx.beginPath();
        ctx.arc(this.aim.x, this.aim.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
    }

}

// Default weapo
export const pistol = new Weapon();

// Shotgun deals more damage, but moves slower
// shotgun bullets can also go through two normal zombies
export const shotgun = new Weapon(7, 2, 15, 20);