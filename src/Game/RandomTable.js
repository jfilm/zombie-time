import { randomInt } from "../utils";

export class RandomTable {
  constructor() {
    this.items = [];
  }

  addItem(weight, item) {
    this.items.push({weight, item});
    return this;
  }

  get totalWeight() {
    return this.items.reduce((acc, cur) => {
      return acc + cur.weight;
    }, 0);
  }

  roll() {
    let roll = randomInt(this.totalWeight);
    let index = 0;
    while (roll > 0) {
      const {weight, item} = this.items[index];
      if (roll < weight) {
        return item;
      }

      roll -= weight;
      index++;
    }
  }
}