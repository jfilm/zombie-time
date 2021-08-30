import colors from "../utils/colors";
import { Entity } from "./Entity";
import { playerMaxHP } from "./Player";
import { shotgun, pistol, rifle } from "./Weapon";
import {
  shotgunImg,
  medicalKitImg,
  pistolImg,
  rifleImg
} from '../utils/imageElements.js'

class Pickup extends Entity {
  constructor(position, radius, color, img, pickupFunction) {
    super(position, radius, color, 0, 0, 1, img);
    this.pickup = pickupFunction;
    this.img = img;
  }
}


export function healthPickup(position, healAmount = 5) {
  return new Pickup(position, 20, colors.healthPickup, medicalKitImg, (player) => {
    player.hp += healAmount;
    player.hp = Math.min(player.hp, playerMaxHP);
  });
}


export function shotgunPickup(position) {
  return new Pickup(position, 20, 'red', shotgunImg, (player) => {
    //Release trigger on the weapon before pick up another one
    if (player.weapon.name !== "shotgun") {
      player.weapon.releaseTrigger();
      player.weapon = shotgun;
    }
  });
}

export function pistolPickup(position) {
  return new Pickup(position, 20, 'red', pistolImg, (player) => {
    //Release trigger on the weapon before pick up another one
    if (player.weapon.name !== "pistol") {
      player.weapon.releaseTrigger();
      player.weapon = pistol;
    }
  });
}

export function riflePickup(position) {
  return new Pickup(position, 20, 'red', rifleImg, (player) => {
    //Release trigger on the weapon before pick up another one
    if (player.weapon.name !== "rifle") {
      player.weapon.releaseTrigger();
      player.weapon = rifle;
    }
  });
}