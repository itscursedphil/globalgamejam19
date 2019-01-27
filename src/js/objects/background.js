import { RenderedItem } from '../engine/renderedItem';
import backgroundSpriteLayer1 from '../../assets/images/bg_space.png';
import backgroundSpriteLayer2 from '../../assets/images/bg_stars.png';
import backgroundSpriteLayer3 from '../../assets/images/bg_stars_layer2.png';
import SpriteSheet from '../engine/spriteSheet';
import Sprite from '../engine/sprite';
import Player from '../objects/player';

export class Background extends RenderedItem {
  /**
   * @param {Player} player 
   * @param {number} layer
   */
  constructor(player, layer = 1) {
    super();
    this.player = player;
    this.layer = layer;
    this.scrollSpeed = 0.1;
    this.horizontalScrollPosition = 800;
    this.verticalScrollPosition = -100;
    let sprite = "";
    switch (this.layer) {
      case 1:
        sprite = backgroundSpriteLayer1;
        break;
      case 2:
        sprite = backgroundSpriteLayer2;
        break;
      case 3:
        sprite = backgroundSpriteLayer3;
        break;
      default:
        sprite = backgroundSpriteLayer1;
        break;
    }

    this.spriteSheet = new SpriteSheet(sprite, 3840, 1080);
    this.acceleration = 0.01;
    this.maxSpeed = 1;
  }

  async initialize(){
    await this.spriteSheet.load();
    this.sprite = new Sprite(this.spriteSheet, 0, 0);
  }

  /**
   * @param {number} tps
   */
  update(tps) {
    const paralaxRatio = 1 + 0.5 * this.layer;

    this.horizontalScrollPosition = 
      (this.horizontalScrollPosition + this.player.direction.x * paralaxRatio) % 1000;

    if(this.horizontalScrollPosition < 0) {
      this.horizontalScrollPosition = 1000 + this.horizontalScrollPosition;
    }

    this.verticalScrollPosition = 
      (this.verticalScrollPosition + this.player.direction.y * paralaxRatio) % 1000;

    if(this.verticalScrollPosition < 0) {
      this.verticalScrollPosition = 1000 + this.verticalScrollPosition;
    }
  }

	/**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (!this.sprite) return;

    const horizontolOffsetPixel =
      (-this.horizontalScrollPosition / 1000) * 3840;
    const verticalScrollPositionPixel =
      (this.verticalScrollPosition / 1000) * 1080;

    this.sprite.render(ctx, -3840 + horizontolOffsetPixel, - 1080 + verticalScrollPositionPixel);
    this.sprite.render(ctx, horizontolOffsetPixel, - 1080 + verticalScrollPositionPixel);
    this.sprite.render(ctx, 3840 + horizontolOffsetPixel, - 1080 + verticalScrollPositionPixel);

    this.sprite.render(ctx, -3840 + horizontolOffsetPixel, verticalScrollPositionPixel);
    this.sprite.render(ctx, horizontolOffsetPixel, verticalScrollPositionPixel);
    this.sprite.render(ctx, 3840 + horizontolOffsetPixel, verticalScrollPositionPixel);

    this.sprite.render(ctx, -3840 + horizontolOffsetPixel, 1080 + verticalScrollPositionPixel);
    this.sprite.render(ctx, horizontolOffsetPixel, 1080 + verticalScrollPositionPixel);
    this.sprite.render(ctx, 3840 + horizontolOffsetPixel, 1080 + verticalScrollPositionPixel);
  }
}