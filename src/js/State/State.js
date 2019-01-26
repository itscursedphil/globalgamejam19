import Inventory from './inventory';
import Player from './player';
import EnvItem from './envItem';
import SpriteSheet from './../engine/spriteSheet';
import Sprite from './../engine/sprite';
import spriteFile from '../../assets/images/spr_assets_128.png'

export default class State {
	constructor() {
		this.inventory = new Inventory();
    this.envitems = [];
    this.spriteSheet = 
      new SpriteSheet(spriteFile, 128, 128);
    this.spriteSheet.load().then(() => {
      this.player = new Player(this.spriteSheet);
    });
	}

	update(availableHeight, availableWidth) {
		this.gameTick(availableHeight, availableWidth);
	}

	render(ctx) {
    if(this.player)
      this.player.render(ctx);
	}

	gameTick(availableHeight, availableWidth, tps = 60) {    
    this.inventory.gameTick(tps);
    if(this.player)
		  this.player.gameTick(availableHeight, availableWidth, tps);
	}
}
