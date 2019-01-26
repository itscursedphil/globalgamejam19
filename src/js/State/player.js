import Vector2 from './vector2';

export default class Player {
	constructor() {
		this.direction = new Vector2(0, 0);
		this.position = new Vector2(0, 0);
	}

	gameTick(tps = 60) {
		this.position.x += this.direction.x / tps;
		this.position.y += this.direction.y / tps;
	}
}
