import ResourceSpawner from '../objects/resourceSpawner';
import spriteFile from '../../assets/images/spr_assets_512.png';
import SpriteSheet from '../engine/spriteSheet';
import Resource from '../objects/resource';
import Player from './player';

export default class State {
  constructor() {
    this.oxygen = new Resource('oxygen');
    this.supplies = new Resource('supplies');
    this.fuel = new Resource('fuel');
    this.envitems = [];

    this.spriteSheet = new SpriteSheet(spriteFile, 512, 512);
    this.spriteSheet.load().then(() => {
      this.player = new Player(this.spriteSheet);
      this.fuelSpawner = new ResourceSpawner(this.inventory.fuel, this.player);
    });
  }

  update(tps = 60) {
    if (!this.player) return;

    this.inventory.oxygen.update(tps);
    this.inventory.fuel.update(tps);
    this.inventory.supplies.update(tps);

    this.fuelSpawner.update(tps);

    if (this.player) this.player.gameTick(tps);
  }

  render(ctx) {
    if (!this.player) return;

    this.player.render(ctx);
  }
}
