import './style.css';
import { GameManager } from './classes/GameManager';


const viewport = document.getElementById("viewport");
const ctx = viewport.getContext("2d");

const viewportWidth = viewport.width;
const viewportHeight = viewport.height;

const viewportScale = window.devicePixelRatio || 1;

viewport.width = viewportWidth * viewportScale;
viewport.height = viewportHeight * viewportScale;

viewport.style.width = viewportWidth + 'px';
viewport.style.height = viewportHeight + 'px';

ctx.scale(viewportScale, viewportScale);


let game = new GameManager(viewport, ctx);




viewport.addEventListener('click', (event) => game.player.weapon.shoot(event));
viewport.addEventListener('mousemove', (event) => game.player.weapon.setAimCoordinates(event, { x: game.player.x, y: game.player.y }))
document.addEventListener('keydown', (event) => game.keyDown(event));
document.addEventListener('keyup', (event) => game.keyUp(event));


//Handle pause button
document.querySelector(".pauseButton").addEventListener('click', () => {
    if (game.state === "running") {
        game.state = "paused"
    } else if (game.state === "paused") {
        game.state = "running"
    }
    console.log(game.state);
    drawFrame();
})

//Handle a restart button
document.querySelector('.restartButton').addEventListener('click', () => {
    game = new GameManager(viewport, ctx)
    drawFrame();
})

// Get DOM elements (messageContainers)
const [winContainer, loseContainer, pauseContainer] = [
    document.querySelector(".win"),
    document.querySelector(".lose"),
    document.querySelector(".pause")
]


// Canvas refresher (please rewrite this comment, I don't know how to call this function 😅)
function drawFrame() {

    game.update();
    game.draw();

    switch (game.state) {
        case "running":
            pauseContainer.style.visibility = "hidden"
            loseContainer.style.visibility = "hidden"
            winContainer.style.visibility = "hidden"
            requestAnimationFrame(drawFrame);
            break;
        case "paused":
            pauseContainer.style.visibility = "visible"
            break;
        case "lose":
            loseContainer.style.visibility = "visible"
            break;
        case "win":
            winContainer.style.visibility = "visible"
            break;
        default:
            break;
    }

}

drawFrame();



