import {RenderedItem} from './renderedItem';
import {Layer} from './layer';

export class Graphics {
	/**
   *
   * @param {Array.<Layer>} layers
   */
	constructor(layers) {
		this.layers = layers;
		/** @type {HTMLCanvasElement} */
		this.canvas = document.querySelector('canvas');
		/** @type {CanvasRenderingContext2D} */
		this.ctx = this.canvas.getContext('2d');

		window.addEventListener('resize', () => this.initCanvasSize());

		this.initCanvasSize();
		this.render();
	}

	update() {
		for (const layer of this.layers) {
			layer.update(this.canvas.width, this.canvas.height);
		}
	}

	render() {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		for (const layer of this.layers) {
			layer.render(this.ctx);
		}

		requestAnimationFrame(() => this.render());
	}

	initCanvasSize() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = (window.innerWidth * 9 / 16) - 4;
		if (this.canvas.height > window.innerHeight) {
			this.canvas.width = (window.innerHeight * 16 / 9);
			this.canvas.height = window.innerHeight - 4;
		}
	}
}
