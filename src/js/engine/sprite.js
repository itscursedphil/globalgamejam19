export default class Sprite {
  constructor(sheet, tileX = 0, tileY = 0, scale = 1) {
    this._showRect = false;

    this.sheet = sheet;
    this.tileX = tileX;
    this.tileY = tileY;
    this.scale = scale;

    this.width = this.sheet.tileWidth;
    this.height = this.sheet.tileHeight;
  }

  showRect() {
    this._showRect = true;
  }

  hideRect() {
    this._showRect = false;
  }

  _drawBounds(ctx) {
    ctx.rect(
      -this.width * this.scale * 0.5,
      -this.width * this.scale * 0.5,
      this.width * this.scale,
      this.height * this.scale
    );
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  _drawOffset(ctx, posX, posY) {
    ctx.rect(0, 0, posX, posY);
    ctx.strokeStyle = 'yellow';
    ctx.stroke();
  }

  render(ctx, posX, posY, rotation = 0) {
    if (!ctx) {
      throw new Error('Context missing');
    }

    ctx.save();
    ctx.translate(posX, posY);
    ctx.rotate(rotation);
    ctx.drawImage(
      this.sheet.img,
      this.width * this.tileX,
      this.height * this.tileY,
      this.width,
      this.height,
      -this.width * this.scale * 0.5,
      -this.height * this.scale * 0.5,
      this.width * this.scale,
      this.height * this.scale
    );

    if (this._showRect) {
      this._drawBounds(ctx);
    }

    ctx.restore();

    if (this._showRect) {
      this._drawOffset(ctx, posX, posY);
    }
  }
}
