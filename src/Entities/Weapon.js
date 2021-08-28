import { Point2d } from "./Point2d";
import { Projectile } from "./Projectile";

export class Weapon {
    constructor(bulletSize = 5, bulletSpeed = 3, bulletDamage = 10, bulletHealth = 10, accuracy = 0.1) {
        this.bulletSize = bulletSize;
        this.bulletSpeed = bulletSpeed;
        this.bulletDamage = bulletDamage;
        this.bulletHealth = bulletHealth;

        this.projectiles = []

        // 1 means totally random spread, 0 means 100% accuracy
        this.accuracy = accuracy;

        //  bullets/second
        this.rateOfFire = 3;

        this.interval;


    }

    pullTrigger(event, playerPos) {
        // this.shoot()
        this.interval = setInterval(() => {
            console.log("hello");
            
            this.shoot(event, playerPos)
            
        }, 100)
    }

    releaseTrigger() {
        clearInterval(this.interval)

    }

    shoot(event, playerPos) {

        //Calculate angle of projectile speed vector.
        const distance_x = event.offsetX - playerPos.x;
        const distance_y = event.offsetY - playerPos.y;

        //By default Math.atan2() returns values from -PI to +PI
        //So this expression make an angle value absolute, from 0 to 2*PI for make it easier to count random angle.
        const angle = Math.atan2(distance_y, distance_x) < 0 ? Math.PI + Math.abs(Math.atan2(distance_y, distance_x) + Math.PI) : Math.atan2(distance_y, distance_x);
        // Angle after counting deviation based on the accuracy value
        const randomAngle = angle + Math.random() * (Math.PI * this.accuracy) * (Math.random() < 0.5 ? -1 : 1);

        const direction = new Point2d(Math.cos(randomAngle), Math.sin(randomAngle));
        this.projectiles.push(new Projectile(playerPos, this.bulletSize, this.bulletSpeed, direction, this.bulletDamage, this.bulletHealth));

    }

}

// Default weapon
export const pistol = new Weapon();

// Shotgun deals more damage, but moves slower
// shotgun bullets can also go through two normal zombies
export const shotgun = new Weapon(7, 2, 15, 20);