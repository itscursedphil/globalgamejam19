import {RenderedItem} from './engine/renderedItem';

export class Background extends RenderedItem {
	constructor(source = '') {
		super();
		this.scrollSpeed = 0.1;
		this.horizontalScrollPosition = 0;
		this.image = document.createElement('img');
		this.image.src = source;
		// This.image.addEventListener('load', () => this.isLoaded = true);
		this.isLoaded = false;
	}

	/**
   * @param {number} availableWidth
   * @param {number} availableHeight
   */
	update(availableWidth, availableHeight) {
    
	}

	/**
   * @param {CanvasRenderingContext2D} ctx
   */
	render(ctx) {
		if (!this.isLoaded) {
			return;
		}

		ctx.drawImage(this.image, 0, 0);
	}
}
