import './style.css';
import { Player } from './classes/Player';
import { Projectile } from './classes/Projectile';
import { Enemy } from './classes/Enemy';

const viewport = document.getElementById("viewport");
const ctx = viewport.getContext("2d");

const viewportWidth = viewport.width;
const viewportHeight = viewport.height;

const viewportScale = window.devicePixelRatio || 1;

viewport.width = viewportScale * viewportWidth;
viewport.height = viewportHeight * viewportScale;

viewport.style.width = viewportWidth + 'px';
viewport.style.height = viewportHeight + 'px';

ctx.scale(viewportScale, viewportScale);


//Creat a new player
const player = new Player(viewportWidth / 2, viewportHeight / 2, 20, "blue")


//Array that contains all projectiles (bullets)
const projectiles = [];








viewport.addEventListener('click', (event) => {

    //Calculate angle of projectile speed vector.
    const angle = Math.atan2(event.offsetY - viewportHeight / 2, event.offsetX - viewportWidth / 2);
    //Get speed by axis in form of object {x, y}
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    // Add new projectile to the array
    projectiles.push(new Projectile(viewportWidth / 2, viewportHeight / 2, 5, 'red', velocity))

})



const enemies = [];
function spawnEnemies() {
    setInterval(() => {
        const radius = 20;


        let x;
        let y;
        // Assign random coordinate just out of the viewport
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : viewportWidth + radius;
            y = Math.random() * viewportHeight;
        } else {
            x = Math.random() * viewportWidth;
            y = Math.random() < 0.5 ? 0 - radius : viewportHeight + radius;

        }

        const color = 'green'
        //Calculate angle of projectile speed vector.
        const angle = Math.atan2(viewportHeight / 2 - y, viewportWidth / 2 - x);
        //Get speed by axis in form of object {x, y}
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 10000)


}
spawnEnemies()



let animationId;

// Canvas refresher (please rewrite this comment, I don't know how to call this function 😅)
function animate() {
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    animationId = requestAnimationFrame(animate);
    player.draw(ctx);

    //Deletes projectiles that fly out of the field
    projectiles.forEach((projectile, i) => {
        projectile.update(ctx)
        if (projectile.x + projectile.radius < 0 || projectile.y + projectile.radius < 0
            || projectile.x - projectile.radius > viewportWidth || projectile.y - projectile.radius > viewportHeight) {
            setTimeout(() => {
                projectiles.splice(i, 1)
            }, 0)

        }

    });


    //Check collision between a projectile and an enemy and remove both from arrays if they collide 
    enemies.forEach((enemy, i) => {
        enemy.update(ctx)

        // A distance between a player and an enemy
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
            console.log("end game");

        }

        projectiles.forEach((projectile, j) => {
            //A distance between a projectile and an enemy
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (dist - enemy.radius - projectile.radius < 1) {
                // Use set time out to get rid of flashing that appears when object is deleting
                setTimeout(() => {
                    enemies.splice(i, 1)
                    projectiles.splice(j, 1)
                }, 0)

            }
        })

    });

}
animate();


