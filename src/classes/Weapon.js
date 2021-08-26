import { Projectile } from "./Projectile";
const viewport = document.getElementById("viewport");



export class Weapon {
    constructor(x, y) {

        this.bulletSize = 5;
        this.speed = 5;
        this.playerX = x;
        this.playerY = y;
        this.projectiles = []
        this.aim = {
            x: 0,
            y: 0,
            radius: 70,
            color: 'yellow',

        }
    }

    shoot(event) {
        //Calculate angle of projectile speed vector.
        const distance_x = event.offsetX - this.playerX;
        const distance_y = event.offsetY - this.playerY;
        const angle = Math.atan2(distance_y, distance_x);
        //Get speed by axis in form of object {x, y}
        const velocity = {
            x: this.speed * Math.cos(angle),
            y: this.speed * Math.sin(angle)
        }
        // Add a new projectile to the array
        this.projectiles.push(new Projectile(this.playerX, this.playerY, this.bulletSize, velocity));
    }

    updateProjectiles(width, height) {
        // Remove offscreen and damaged projectiles
        this.projectiles = this.projectiles.filter((projectile) => {
            return projectile.x > 0 && projectile.y > 0 && projectile.x < width && projectile.y < height && projectile.hp > 0;
        });
    }

    setAimCoordinates(event, playerCoordinates) {

        const dx = event.offsetX - playerCoordinates.x
        const dy = event.offsetY - playerCoordinates.y

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