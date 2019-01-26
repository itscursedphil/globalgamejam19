import Keys from '../inputs';
import SpriteSheet from '../engine/spriteSheet';
import Sprite from '../engine/sprite';
import Vector2 from './vector2';

export default class Player {
  /**
   * @param {SpriteSheet} spriteSheet
   */
  constructor(spriteSheet) {
    this.direction = new Vector2(0, 0);
    this.position = new Vector2(0, 0);
    this.acceleration = 0.01;
    this.maxSpeed = 1;
    this.sprite = new Sprite(spriteSheet, 3, 7);
    this.lowSpeedTolerance = 0.05;
  }

  gameTick(tps = 60) {
    this.position.x += this.direction.x / tps;
    this.position.y += this.direction.y / tps;

    this.position.x = Math.max(-1, Math.min(1, this.position.x));
    this.position.y = Math.max(-1, Math.min(1, this.position.y));

    let hasAccelerated = false;
    if (Keys.getKeyName('W')) {
      hasAccelerated = true;
      this.direction.y -= this.acceleration;
    }

    if (Keys.getKeyName('S')) {
      hasAccelerated = true;
      this.direction.y += this.acceleration;
    }

    if (Keys.getKeyName('A')) {
      hasAccelerated = true;
      this.direction.x -= this.acceleration;
    }

    if (Keys.getKeyName('D')) {
      hasAccelerated = true;
      this.direction.x += this.acceleration;
    }

    if (this.direction.speed() > this.maxSpeed) {
      this.direction.x *= 0.99;
      this.direction.y *= 0.99;
    }

    if (this.direction.speed() < this.lowSpeedTolerance && !hasAccelerated) {
      this.direction.x = 0;
      this.direction.y = 0;
    }

    if (this.position.x > 0.75 || this.position.x < -0.75 || this.position.y > 0.75 || this.position.y < -0.75) {
      if (this.direction.x < 0 === this.position.x < 0) {
        this.direction.x *= 0.9;
      }

      if (this.direction.y < 0 === this.position.y < 0) {
        this.direction.y *= 0.9;
      }
    }

    if (this.position.x > 0.95 || this.position.x < -0.95 || this.position.y > 0.95 || this.position.y < -0.95) {
      if (this.direction.x < 0 === this.position.x < 0) {
        this.direction.x *= 0;
      }

      if (this.direction.y < 0 === this.position.y < 0) {
        this.direction.y *= 0;
      }
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.sprite.render(
      ctx,
      Math.max(
        256,
        Math.min(
          ctx.canvas.width - 256,
          ctx.canvas.width / 2 - 256 + this.position.x * ctx.canvas.width / 2)),
      Math.max(
        256,
        Math.min(
          ctx.canvas.height - 256,
          ctx.canvas.height / 2 - 256 + this.position.y * ctx.canvas.height / 2)));
  }
}
