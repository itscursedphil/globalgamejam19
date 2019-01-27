import ResourceSpawner from '../resourceSpawner';
import spriteFile from '../../assets/images/spr_assets_512.png';
import collisionCheck from '../collision';
import SpriteSheet from '../engine/spriteSheet';
import Sprite from '../engine/sprite';
import Inventory from './inventory';
import Player from './player';
import EnvItem from './envItem';

export default class State {
  constructor() {
    this.inventory = new Inventory();
    this.envitems = [];
    this.spriteSheet = new SpriteSheet(spriteFile, 512, 512);
    this.spriteSheet.load().then(() => {
      this.player = new Player(this.spriteSheet);
      this.rs = new ResourceSpawner(this.player, this);
    });
    this.interval = setInterval(() => {
      console.log(this.envitems);
    }, 1000);
  }

  update(tps) {
    this.gameTick(tps);
  }

  render(ctx) {
    if (this.player) {
      this.player.render(ctx);
    }
  }

  gameTick(tps = 60) {
    this.inventory.gameTick(tps);
    if (this.player) this.player.gameTick(tps);
    collisionCheck(this.player, this.envitems);
  }
}
