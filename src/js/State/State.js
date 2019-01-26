import spriteFile from '../../assets/images/spr_assets_128.png';
import ResourceSpawner from '../resourceSpawner';
import SpriteSheet from '../engine/spriteSheet';
import Sprite from '../engine/sprite';
import Inventory from './inventory';
import Player from './player';
import EnvItem from './envItem';

export default class State {
  constructor() {
    this.inventory = new Inventory();
    this.envitems = [];
    this.spriteSheet = new SpriteSheet(spriteFile, 128, 128);
    this.spriteSheet.load().then(() => {
      this.player = new Player(this.spriteSheet);
      this.rs = new ResourceSpawner(this.player, this);
    });
  }

  update(availableHeight, availableWidth) {
    this.gameTick(availableHeight, availableWidth);
  }

  render(ctx) {
    if (this.player) {
      this.player.render(ctx);
    }
  }

  gameTick(availableHeight, availableWidth, tps = 60) {
    this.inventory.gameTick(tps);
    if (this.player) {
      this.player.gameTick(availableHeight, availableWidth, tps);
    }
  }
}
