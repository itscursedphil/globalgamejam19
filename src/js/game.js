export class Game {
  constructor() {
    this._lastTimeStamp = 0;
    this.updateCallback = tps => {};
    this.renderCallback = ctx => {};
    this.initializeCallback = async () => {};
    window.addEventListener('load', () => this.start());
  }

  async start() {
    await this.initializeCallback();
    /** @type {HTMLCanvasElement} */
    this.canvas = document.querySelector('canvas');
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('resize', () => this.initCanvasSize());
    this.initCanvasSize();
    this.tick(performance.now());
  }

  initCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight - 4;
  }

  tick(timeStamp) {
    const tps = 1 / ((timeStamp - this._lastTimeStamp) / 1000);
    this._lastTimeStamp = timeStamp;

    this.updateCallback(tps);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderCallback(this.ctx);

    requestAnimationFrame(timeStamp => this.tick(timeStamp));
  }

  initialize(callback) {
    this.initializeCallback = callback;
  }

  update(callback) {
    this.updateCallback = callback;
  }

  render(callback) {
    this.renderCallback = callback;
  }
}
