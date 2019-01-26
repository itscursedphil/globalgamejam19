export default class SpriteSheet {
  constructor(src = '', tileWidth = 16, tileHeight = 16, ctx) {
    if (!ctx) {
      throw new Error('No canvas context provided!');
    }

    this.loaded = false;
    this.img = null;
    this.width = 0;
    this.height = 0;

    this.src = src;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.ctx = ctx;
  }

  _loadImage() {
    const img = document.createElement('img');

    return new Promise(resolve => {
      img.addEventListener('load', () => {
        resolve(img);
      });
      img.src = this.src;
    });
  }

  _getFileType() {
    const type = this.src.match(/\.([0-9a-z]+)$/i)[1];

    if (type === 'jpg') {
      return 'image/jpeg';
    }

    return 'image/' + type;
  }

  async load() {
    const _img = await this._loadImage();

    const type = this._getFileType();
    this.type = type;

    if (_img.width % this.tileWidth !== 0) {
      throw new Error('tileWidth does not match image width');
    }

    if (_img.height % this.tileHeight !== 0) {
      throw new Error('tileHeight does not match image height');
    }

    const img = new Image(_img.width, _img.height);
    img.scr = this.src;

    this.loaded = true;
    this.width = _img.width;
    this.height = _img.height;
    this.img = img;

    return this;
  }

  // CreateTile(x = 0, y = 0) {
  //   const _canvas = document.createElement('canvas');
  //   const _ctx = _canvas.getContext('2d');

  //   _canvas.width = this.tileWidth;
  //   _canvas.height = this.tileHeight;

  //   _canvas.drawImage(
  //     this.img,
  //     this.tileWidth * x,
  //     this.tileHeight * y,
  //     this.tileWidth,
  //     this.tileHeight
  //   );

  //   const tile = new Image(this.tileWidth, this.tileHeight);
  // }
}
