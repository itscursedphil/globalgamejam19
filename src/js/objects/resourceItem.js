import GameObject from './gameObject';

export default class ResourceItem {
  constructor(resource, x = 0, y = 0, sprite) {
    this._object = new GameObject(x, y, sprite);
    this._resource = resource;

    this._rotation = Math.floor(Math.random() * 360);
  }

  update(tps, player) {
    this._object.update(tps, player);
    this._rotation += 0.5;
  }

  render(ctx) {
    this._object.render(ctx, this._rotation);
  }
}
