import { Point2d } from "./Point2d";
import { Projectile } from "./Projectile";
import { cursorCoordinates } from "../utils/cursorCoordinates";
import { pistolShotHowl, rifleShotHowl, shotGunShotHowl } from '../Game/sounds';


export class Weapon {
    constructor(shotSound, name, bulletSize = 3, bulletSpeed = 3, bulletDamage = 5, bulletHealth = 2, accuracy = 0.95, bulletsInOneShoot = 1, rateOfFire = 3, isAutomatic = true) {
        this.bulletSize = bulletSize;
        this.bulletSpeed = bulletSpeed;
        this.bulletDamage = bulletDamage;
        this.bulletHealth = bulletHealth;
        this.isAutomatic = isAutomatic;

        // <=0 means totally random spread, >=1 means 100% accuracy. 
        this.accuracy = accuracy;

        //  bullets/second
        this.rateOfFire = rateOfFire;

        this.playerPos;

        this.interval;

        this.canShoot = true;

        this.bulletsInOneShoot = bulletsInOneShoot;

        this.shotSound = shotSound;

        this.name = name;
    }

    pullTrigger(pushProjectile) {
        const coordinates = cursorCoordinates();

        //Set limit on the rate of fire
        if (this.canShoot) {

            for (let i = 0; i < this.bulletsInOneShoot; i++) {
                pushProjectile(this.shoot(coordinates, this.playerPos))
            }

            setTimeout(() => {
                this.canShoot = true
            }, 1000 / this.rateOfFire)

        }


        // Make automatic shooting possible
        if (this.isAutomatic) {
            this.interval = setInterval(() => {
                for (let i = 0; i < this.bulletsInOneShoot; i++) {
                    pushProjectile(this.shoot(coordinates, this.playerPos))
                }
    
            }, 1000 / this.rateOfFire);
        }

        this.canShoot = false;
    }

    releaseTrigger() {
        if (this.isAutomatic) {
            clearInterval(this.interval);
        }
    }

    shoot(cursorCoordinates, playerPos) {

        //Play shot sound
        this.shotSound.play();

        //Calculate angle of projectile speed vector.
        const distance_x = cursorCoordinates.x - playerPos.x;
        const distance_y = cursorCoordinates.y - playerPos.y;

        //By default Math.atan2() returns values from -PI to +PI
        //So this expression make an angle value absolute, from 0 to 2*PI for make it easier to count random angle.
        const angle = Math.atan2(distance_y, distance_x) < 0 ? Math.PI + Math.abs(Math.atan2(distance_y, distance_x) + Math.PI) : Math.atan2(distance_y, distance_x);

        // Angle after counting deviation based on the accuracy value
        const randomAngle = angle + Math.random() * (Math.PI * (this.accuracy > 1 ? 0 : this.accuracy < 0 ? 1 : 1 - this.accuracy)) * (Math.random() < 0.5 ? -1 : 1);

        const direction = new Point2d(Math.cos(randomAngle), Math.sin(randomAngle));

        return new Projectile(new Point2d(playerPos.x, playerPos.y), this.bulletSize, this.bulletSpeed, direction, this.bulletDamage, this.bulletHealth);

    }

}

// Default weapon
export const pistol = new Weapon(pistolShotHowl, 'pistol');

// Shotgun deals more damage, but moves slower
// shotgun bullets can also go through two normal zombies
export const shotgun = new Weapon(shotGunShotHowl, 'shotgun', 2, 2, 5, 20, 0.8, 5, 0.65, false);

export const rifle = new Weapon(rifleShotHowl, "rifle", 3, 5, 1, 1, 0.9, 1, 12, true);