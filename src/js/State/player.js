import Keys from '../inputs';
import Vector2 from './vector2';

export default class Player {
	constructor() {
		this.direction = new Vector2(0, 0);
		this.position = new Vector2(0, 0);
		this.acceleration = 1;
		this.maxSpeed = 100;
	}

	gameTick(tps = 60) {
		this.position.x += this.direction.x / tps;
		this.position.y += this.direction.y / tps;

		if (Keys.getKeyName('W')) {
			this.direction.y -= this.acceleration;
		}

		if (Keys.getKeyName('S')) {
			this.direction.y += this.acceleration;
		}

		if (Keys.getKeyName('A')) {
			this.direction.x -= this.acceleration;
		}

		if (Keys.getKeyName('D')) {
			this.direction.x += this.acceleration;
		}

		if (this.direction.speed() > this.maxSpeed) {
			this.direction.x *= 0.99;
			this.direction.y *= 0.99;
		}
	}
}
