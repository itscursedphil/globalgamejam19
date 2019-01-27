export default class GameObject {
  constructor(x, y, sprite) {
    this._x = x;
    this._y = y;
    this._sprite = sprite;

    this._rotation = Math.floor(Math.random() * 360);
  }

  update(tps, player) {
    if (this._sprite.update) this._sprite.update(tps);

    this._x = this._x - player.direction.x;
    this._y = this._y + player.direction.y;
  }

  render(ctx, rotation = 0) {
    this._sprite.render(
      ctx,
      this._x + ctx.canvas.width * 0.5,
      this._y + ctx.canvas.height * 0.5,
      rotation
    );
  }
}
