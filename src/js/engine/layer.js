import {RenderedItem} from './renderedItem';

export class Layer extends RenderedItem {
  /**
   * @param {Array.<RenderedItem>} items
   */
  constructor(items) {
    super();
    this.items = items;
  }

  /**
   * @param {number} tps
   */
  update(tps) {
    for (const item of this.items) {
      item.update(tps);
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    for (const item of this.items) {
      item.render(ctx);
    }
  }
}
