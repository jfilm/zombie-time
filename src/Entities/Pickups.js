import { Entity } from "./Entity";
import { playerMaxHP } from "./Player";

class Pickup extends Entity {
  constructor(position, radius, color, pickupFunction) {
    super(position, radius, color, 0, 0, 1);
    this.pickup = pickupFunction;
  }
}

export function healthPickup(position, healAmount = 5) {
  return new Pickup(position, 8, "indigo", (player) => {
    player.hp += healAmount;
    player.hp = Math.min(player.hp, playerMaxHP);
  });
}