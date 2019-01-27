import { RenderedItem } from './renderedItem';

export class Layer extends RenderedItem {
  /**
   * @param {Array.<RenderedItem>} items
   */
  constructor(items) {
    super();
    this.items = items;
  }

  async initialize() {
    const promises = [];
    for (const item of this.items) {
      if (item.initialize)
        promises.push(item.initialize());
    }

    await Promise.all(promises);
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
