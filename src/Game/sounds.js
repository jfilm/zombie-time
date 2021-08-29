import { Howl, Howler } from 'howler';



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