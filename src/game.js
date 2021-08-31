import './style.css';
import './styles/dashboard.scss';

import { GameManager, gameState } from './Game/GameManager';
import { gunMapping } from './utils/imagesMapping';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// const dpr = window.devicePixelRatio;
const viewport = document.getElementById('viewport');
const ctx = viewport.getContext('2d');

const viewportWidth = viewport.width;
const viewportHeight = viewport.height;

const viewportScale = 1;

viewport.width = viewportWidth * viewportScale;
viewport.height = viewportHeight * viewportScale;

viewport.style.width = viewportWidth + 'px';
viewport.style.height = viewportHeight + 'px';

ctx.scale(viewportScale, viewportScale);

// Get DOM elements (messageContainers)
const [startContainer, winContainer, loseContainer, pauseContainer, gunSlot] = [
  document.querySelector('.start'),
  document.querySelector('.win'),
  document.querySelector('.lose'),
  document.querySelector('.pause'),
  document.querySelector('.gunSlot>img'),
];

// Setting weapon image based on the weapon name
function setWeaponImage(containerElement, weaponName) {
  gunMapping.forEach((gun) => {
    if (weaponName === gun.name) {
      containerElement.src = gun.src;
    }
  });
}

function drawFrame(game) {
  game.draw();

  switch (game.state) {
    case 'start':
      startContainer.style.visibility = 'visible';
      pauseContainer.style.visibility = 'hidden';
      loseContainer.style.visibility = 'hidden';
      winContainer.style.visibility = 'hidden';
      break;
    case 'running':
      setWeaponImage(gunSlot, game.game.player.weapon.name);
      pauseContainer.style.visibility = 'hidden';
      loseContainer.style.visibility = 'hidden';
      winContainer.style.visibility = 'hidden';
      startContainer.style.visibility = 'hidden';

      break;
    case 'paused':
      pauseContainer.style.visibility = 'visible';
      break;
    case 'lose':
      loseContainer.style.visibility = 'visible';
      break;
    case 'win':
      winContainer.style.visibility = 'visible';
      break;
    default:
      break;
  }

  requestAnimationFrame(() => drawFrame(game));
}

// drawFrame();

function init() {
  // Start up game
  const game = new GameManager(viewport, ctx);


  viewport.addEventListener('click', (event) => game.mouseClick(event));
  viewport.addEventListener('mousedown', (event) => game.mouseDown(event));
  document.addEventListener('mouseup', (event) => game.mouseUp(event));
  viewport.addEventListener('mousemove', (event) => game.mouseMove(event));
  document.addEventListener('keydown', (event) => game.keyDown(event));
  document.addEventListener('keyup', (event) => game.keyUp(event));
  document.addEventListener('notification', (e) => {

    document.querySelector('.waveMessage').textContent = "Wave " + e.detail.waveNumber;
    document.querySelector('.waveMessage').className = 'appear waveMessage'

    setTimeout(() => {
      document.querySelector('.waveMessage').className = 'disappear waveMessage'

    }, 3000)

  })

  //Handle pause button
  const pauseButton = document.querySelector('.pauseButton');
  pauseButton.addEventListener('click', () => {
    if (game.state === gameState.RUNNING) {
      pauseButton.innerHTML = '<i class="fas fa-play"></i>';
      game.state = gameState.PAUSED;
    } else if (game.state === gameState.PAUSED) {
      pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
      game.state = gameState.RUNNING;
    }
  });

  //Handle a restart button
  const buttons = document.getElementsByClassName('restartButton');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      game.resetGame();
    });
  }

  //Handle a start button
  const startButton = document.querySelector('.startButton');
  startButton.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent("notification", {
      detail: {
        waveNumber: 1
      }
    }))
    game.state = gameState.RUNNING;
  });

  setInterval(() => {
    if (document.hasFocus()) {
      game.update();
    }
  }, 1 / 60);
  // console.log(game);
  drawFrame(game);
}

init();
