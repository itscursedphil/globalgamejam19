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
   * @param {number} availableWidth
   * @param {number} availableHeight
   */
	update(availableWidth, availableHeight) {
		for (const item of this.items) {
			item.update(availableWidth, availableHeight);
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
