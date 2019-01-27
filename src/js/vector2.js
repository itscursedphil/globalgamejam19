export default class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  speed() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   *
   * @param {Vector2} otherVector
   * @returns {Number}
   */
  distance(otherVector) {
    return new Vector2(this.x - otherVector.x, this.y - otherVector.y).speed();
  }
}
