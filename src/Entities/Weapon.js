import { Point2d } from "./Point2d";
import { Projectile } from "./Projectile";
import { cursorCoordinates } from "../utils/cursorCoordinates";

export class Weapon {
    constructor(bulletSize = 3, bulletSpeed = 3, bulletDamage = 5, bulletHealth = 1, accuracy = 0.05) {
        this.bulletSize = bulletSize;
        this.bulletSpeed = bulletSpeed;
        this.bulletDamage = bulletDamage;
        this.bulletHealth = bulletHealth;

        this.projectiles = []

        // 1 means totally random spread, 0 means 100% accuracy
        this.accuracy = accuracy;

        //  bullets/second
        this.rateOfFire = 3;

        this.playerPos;

        this.interval;

        this.canShoot = true;
    }

    pullTrigger() {
        const coordinates = cursorCoordinates();

        //Set limit on the rate of fire
        if (this.canShoot) {
            this.shoot(coordinates, this.playerPos)
            setTimeout(() => {
                this.canShoot = true
            }, 1000 / this.rateOfFire)

        }

        //Make automatic shooting possible
        this.interval = setInterval(() => {
            this.shoot(coordinates, this.playerPos)

        }, 1000 / this.rateOfFire)

        this.canShoot = false;
    }

    releaseTrigger() {
        clearInterval(this.interval)
    }

    shoot(cursorCoordinates, playerPos) {

        //Calculate angle of projectile speed vector.
        const distance_x = cursorCoordinates.x - playerPos.x;
        const distance_y = cursorCoordinates.y - playerPos.y;

        //By default Math.atan2() returns values from -PI to +PI
        //So this expression make an angle value absolute, from 0 to 2*PI for make it easier to count random angle.
        const angle = Math.atan2(distance_y, distance_x) < 0 ? Math.PI + Math.abs(Math.atan2(distance_y, distance_x) + Math.PI) : Math.atan2(distance_y, distance_x);
        // Angle after counting deviation based on the accuracy value
        const randomAngle = angle + Math.random() * (Math.PI * this.accuracy) * (Math.random() < 0.5 ? -1 : 1);

        const direction = new Point2d(Math.cos(randomAngle), Math.sin(randomAngle));

        const projectile = new Projectile(new Point2d(playerPos.x, playerPos.y), this.bulletSize, this.bulletSpeed, direction, this.bulletDamage, this.bulletHealth)

        this.projectiles.push(projectile)

    }

}

// Default weapon
export const pistol = new Weapon();

// Shotgun deals more damage, but moves slower
// shotgun bullets can also go through two normal zombies
export const shotgun = new Weapon(7, 2, 15, 20, 0.15);