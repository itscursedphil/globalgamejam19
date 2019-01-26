import { RenderedItem } from './renderedItem';
import { Layer } from './layer';

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

    this._lastTimeStamp = 0;

    window.addEventListener('resize', () => this.initCanvasSize());

    this.initCanvasSize();
    this.render();
  }

  update(tps) {
    for (const layer of this.layers) {
      layer.update(tps);
    }
  }

  render(timeStamp = 60) {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const tps = 1 / ((timeStamp - this._lastTimeStamp) / 1000);
    this._lastTimeStamp = timeStamp;

    this.update(tps);

    for (const layer of this.layers) {
      layer.render(this.ctx);
    }

    requestAnimationFrame(timeStamp => this.render(timeStamp));
  }

  initCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 4;
  }
}
