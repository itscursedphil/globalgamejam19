import Keys from '../inputs';
import Vector2 from './vector2';
import SpriteSheet from './../engine/spriteSheet';
import Sprite from './../engine/sprite';


export default class Player {
  /**
   * @param {SpriteSheet} spriteSheet 
   */
  constructor(spriteSheet) {
		this.direction = new Vector2(0, 0);
		this.position = new Vector2(0, 0);
		this.acceleration = 1;
    this.maxSpeed = 100;
    this.sprite = new Sprite(spriteSheet, 0, 0);
	}

	gameTick(availableHeight, availableWidth, tps = 60) {
		this.position.x += this.direction.x / tps;
    this.position.y += this.direction.y / tps;  

    this.position.x = Math.max(-1, Math.min(1, this.position.x));
    this.position.y = Math.max(-1, Math.min(1, this.position.y));

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
  
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   */
  render(ctx) {
    this.sprite.render(
      ctx, 
      ctx.canvas.width / 2 - 64 + this.position.x * ctx.canvas.width / 2, 
      ctx.canvas.height / 2 - 64 + this.position.y * ctx.canvas.height / 2);
  }
}
