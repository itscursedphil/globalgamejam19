import { RenderedItem } from '../engine/renderedItem';
import backgroundSprite from '../../assets/images/bg_space.png';

export class Background extends RenderedItem {
  constructor(source = "") {
    super();
    this.scrollSpeed = 0.1;
    this.horizontalScrollPosition = 0;
    this.image = document.createElement("img");
    this.image.src = source;
    this.image.addEventListener("load", () => this.isLoaded = true);
    this.isLoaded = false;
  }

  /**
   * @param {number} tps
   */
  update(tps) {

  }

	/**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    if (!this.isLoaded) return;
    ctx.drawImage(this.image, 0, 0);
  }
}