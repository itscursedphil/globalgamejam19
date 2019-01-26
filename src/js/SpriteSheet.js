export default class SpriteSheet {
  constructor(src = '', tileWidth = 16, tileHeight = 16) {
    this.loaded = false;
    this.img = null;
    this.width = 0;
    this.height = 0;

    this.src = src;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  _loadImage(src) {
    const img = document.createElement('img');

    return new Promise(resolve => {
      img.addEventListener('load', () => {
        resolve(img);
      });
      img.src = src;
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
    const _img = await this._loadImage(this.src);

    if (_img.width % this.tileWidth !== 0) {
      throw new Error('tileWidth does not match image width');
    }

    if (_img.height % this.tileHeight !== 0) {
      throw new Error('tileHeight does not match image height');
    }

    const img = new Image(_img.width, _img.height);
    img.src = this.src;

    const type = this._getFileType();
    this.type = type;

    this.loaded = true;
    this.width = _img.width;
    this.height = _img.height;
    this.img = img;

    return this;
  }
}
