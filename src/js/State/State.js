import Inventory from './inventory';
import Player from './player';
import EnvItem from './envItem';

export default class State {
	constructor() {
		this.inventory = new Inventory();
		this.player = new Player();
		this.envitems = [];
	}

	update() {
		this.gameTick();
	}

	render() {

	}

	gameTick(tps = 60) {
		this.inventory.gameTick(tps);
		this.player.gameTick(tps);
	}
}
