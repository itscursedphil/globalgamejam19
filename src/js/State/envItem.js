import Vector2 from './vector2';

export default class EnvItem {
  constructor(x = 0, y = 0) {
    this.position = new Vector2(x, y);
    this.oxygen = 0;
    this.supplies = 0;
    this.fuel = 0;
  }

  makeResource(type = '', amount = 0) {
    switch (type.toUpperCase()) {
      case 'OXYGEN':
        this.oxygen = amount;
        break;
      case 'SUPPLIES':
        this.supplies = amount;
        break;
      case 'FUEL':
        this.fuel = amount;
        break;
      default:
        break;
    }
  }
}
function random(min = 0, max = 1, x = 0, y = 0) {
  const newenvItem = new EnvItem(x, y);
  newenvItem.makeResource(['OXYGEN', 'SUPPLIES', 'FUEL'][randomIntFromInterval(0, 3)], randomIntFromInterval(min, max));
  return newenvItem;
}

EnvItem.random = random;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
