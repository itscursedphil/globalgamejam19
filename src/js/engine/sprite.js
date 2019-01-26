export default class Sprite {
  constructor(sheet, tileX = 0, tileY = 0) {
    this.sheet = sheet;
    this.tileX = tileX;
    this.tileY = tileY;

    this.width = this.sheet.tileWidth;
    this.height = this.sheet.tileHeight;
  }

  render(ctx, posX = 0, posY = 0, rotation = 0) {
    if (!ctx) {
      throw new Error('Context missing');
    }

    ctx.save();
    ctx.translate(posX + this.width * 0.5, posY + this.height * 0.5);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(
      this.sheet.img,
      this.width * this.tileX,
      this.height * this.tileY,
      this.width,
      this.height,
      -this.width * 0.5,
      -this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
