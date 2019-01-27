import Resource from '../objects/resource';

export default class Inventory {
  constructor() {
    this.oxygen = new Resource('oxygen');
    this.supplies = new Resource('supplies');
    this.fuel = new Resource('fuel');
  }
}
