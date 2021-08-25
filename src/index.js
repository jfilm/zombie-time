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

// Need to realise function that deletes projectiles that fly out of the field
// function clearProjectilesArray() {}






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
    }, 1000)


}
spawnEnemies()



// Canvas refresher (please rewrite this comment, I don't know how to call this function 😅)
function animate() {
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    requestAnimationFrame(animate);
    player.draw(ctx);
    // console.log("go");
    projectiles.forEach(projectile => {
        projectile.update(ctx)

    });
    enemies.forEach(enemy => {
        enemy.update(ctx)

    });

}
animate();


