import colors from "../utils/colors";
import { Entity } from "./Entity";
import { playerMaxHP } from "./Player";
import { shotgun, pistol } from "./Weapon";
import {
  shotgunImg,
  medicalKitImg,
  pistolImg
} from '../utils/imageElements.js'

class Pickup extends Entity {
  constructor(position, radius, color, pickupFunction, img) {
    super(position, radius, color, 0, 0, 1, img);
    this.pickup = pickupFunction;
    this.img = img;
  }
}


export function healthPickup(position, healAmount = 5) {
  return new Pickup(position, 8, colors.healthPickup, (player) => {
    player.hp += healAmount;
    player.hp = Math.min(player.hp, playerMaxHP);
  }, medicalKitImg);
}


export function shotgunPickup(position) {
  return new Pickup(position, 8, 'red', (player) => {
    player.weapon = shotgun;
  }, shotgunImg);
}

export function pistolPickup(position) {
  return new Pickup(position, 8, 'red', (player) => {
    player.weapon = pistol;
  }, pistolImg);
}