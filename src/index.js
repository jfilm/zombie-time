import './style.css';
import { Player } from './classes/Player';
import { Projectile } from './classes/Projectile';

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


const player = new Player(viewportWidth / 2, viewportHeight / 2, 20, "green")





const projectiles = [];


viewport.addEventListener('click', (event) => {

    const angle = Math.atan2(event.offsetY - viewportHeight / 2, event.offsetX - viewportWidth / 2);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    console.log(angle);
    projectiles.push(new Projectile(viewportWidth / 2, viewportHeight / 2, 5, 'red', velocity))

})



function animate() {
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    requestAnimationFrame(animate);
    player.draw(ctx);
    console.log("go");
    projectiles.forEach(projectile => {
        projectile.update(ctx)

    });

}

animate();


