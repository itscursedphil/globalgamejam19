import Keys from '../engine/inputs';
import SpriteSheet from '../engine/spriteSheet';
import Sprite from '../engine/sprite';
import Vector2 from '../vector2';
import { RenderedItem } from '../engine/renderedItem';

export default class Player extends RenderedItem {
  /**
   * @param {SpriteSheet} spriteSheet
   */
  constructor(spriteSheet) {
    super();
    this.rdirection = new Vector2(0, 0);
    this.rposition = new Vector2(0, 0);
    this.direction = new Vector2(0, 0);
    this.position = new Vector2(0, 0);
    this.acceleration = 0.01;
    this.maxSpeed = 1;
    this.sprite = new Sprite(spriteSheet, 3, 7, 0.25);
    this.lowSpeedTolerance = 0.05;
  }

  update(tps = 60) {
    this.rposition.x += this.rdirection.x / tps;
    this.rposition.y += this.rdirection.y / tps;

    this.position.x += this.direction.x / tps;
    this.position.y += this.direction.y / tps;

    this.rposition.x = Math.max(-1, Math.min(1, this.rposition.x));
    this.rposition.y = Math.max(-1, Math.min(1, this.rposition.y));

    let hasAccelerated = false;
    if (Keys.getKeyName('W')) {
      hasAccelerated = true;
      if (this.direction.y > 0) {
        this.direction.y -= this.acceleration;
      } else {
        this.rdirection.y -= this.acceleration;
      }
    }

    if (Keys.getKeyName('S')) {
      hasAccelerated = true;
      if (this.direction.y < 0) {
        this.direction.y += this.acceleration;
      } else {
        this.rdirection.y += this.acceleration;
      }
    }

    if (Keys.getKeyName('A')) {
      hasAccelerated = true;
      if (this.direction.x > 0) {
        this.direction.x -= this.acceleration;
      } else {
        this.rdirection.x -= this.acceleration;
      }
    }

    if (Keys.getKeyName('D')) {
      hasAccelerated = true;
      if (this.direction.x < 0) {
        this.direction.x += this.acceleration;
      } else {
        this.rdirection.x += this.acceleration;
      }
    }

    if (this.rdirection.speed() > this.maxSpeed) {
      this.rdirection.x *= 0.99;
      this.rdirection.y *= 0.99;
    }

    if (this.direction.speed() > this.maxSpeed) {
      this.direction.x *= 0.9;
      this.direction.y *= 0.9;
    }

    if (this.rdirection.speed() < this.lowSpeedTolerance && !hasAccelerated) {
      this.rdirection.x = 0;
      this.rdirection.y = 0;
    }

    if (
      this.rposition.x > 0.4 ||
      this.rposition.x < -0.4 ||
      this.rposition.y > 0.4 ||
      this.rposition.y < -0.4
    ) {
      if (this.rdirection.x < 0 === this.rposition.x < 0) {
        this.rdirection.x *= 0.9;
      }

      if (this.rdirection.y < 0 === this.rposition.y < 0) {
        this.rdirection.y *= 0.9;
      }
    }

    if (
      this.rposition.x > 0.5 ||
      this.rposition.x < -0.5 ||
      this.rposition.y > 0.5 ||
      this.rposition.y < -0.5
    ) {
      if (this.rdirection.x < 0 === this.rposition.x < 0) {
        if (this.rdirection.x !== 0) {
          this.direction.x += hasAccelerated
            ? this.rdirection.x < 0
              ? -this.acceleration
              : this.acceleration
            : 0;
        }

        this.rdirection.x *= 0;
      }

      if (this.rdirection.y < 0 === this.rposition.y < 0) {
        if (this.rdirection.y !== 0) {
          this.direction.y += hasAccelerated
            ? this.rdirection.y < 0
              ? -this.acceleration
              : this.acceleration
            : 0;
        }

        this.rdirection.y *= 0;
      }

      if (
        this.rposition.x < 0.15 &&
        this.rposition.x > -0.15 &&
        this.rposition.y < 0.15 &&
        this.rposition.y > -0.15
      ) {
        this.direction = new Vector2(0, 0);
      }
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.sprite.render(
      ctx,
      ctx.canvas.width / 2 + (this.rposition.x * ctx.canvas.width) / 2,
      ctx.canvas.height / 2 + (this.rposition.y * ctx.canvas.height) / 2
    );
  }
}
