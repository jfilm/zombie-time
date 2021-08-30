import { Howl, Howler } from 'howler';



let isMute = false;



export const pistolShotHowl = new Howl({
    src: ['assets/sounds/pistol-shoot.mp3'],

    volume: 0.1

})

export const shotGunShotHowl = new Howl({
    src: ['assets/sounds/shotgun-shoot.mp3'],
    volume: 0.01

})


export const winHowl = new Howl({
    src: ['assets/sounds/win.mp3'],
    volume: 0.4

})

export const loseHowl = new Howl({
    src: ['assets/sounds/lose.mp3'],
    volume: 0.4

})

export const backgroundMusic = new Howl({
    src: ['assets/sounds/background.mp3'],
    loop: true,
    volume: 0.05,
})

export const hitHowl = new Howl({
    src: ['assets/sounds/hit.wav'],
    volume: 0.05,
})

export const pickupHowl = new Howl({
    src: ['assets/sounds/pickup.wav'],
    volume: 0.05,
})

const sounds = [pistolShotHowl,
    shotGunShotHowl,
    winHowl,
    loseHowl,
    backgroundMusic,
    hitHowl]



function muteAll(soundsArray, muteState) {

    soundsArray.forEach(sound => {
        sound.mute(muteState)
    })

}


const soundButton = document.querySelector('.soundButton');

soundButton.addEventListener('click', () => {

    if (isMute) {

        muteAll(sounds, !isMute);
        soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';


        isMute = !isMute
    } else {
        muteAll(sounds, !isMute);
        soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';

        isMute = !isMute

    }


})






