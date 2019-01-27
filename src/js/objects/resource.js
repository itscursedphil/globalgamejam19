const clamp = (val, min, max) => {
  return Math.min(Math.max(min, val), max);
};

export default class Resource {
  constructor(name = '') {
    this.name = name;
    this.value = 1.0;
    this._maxValue = 1.0;
    this._modValue = 0.0005;
  }

  setValue(val) {
    this.value = val;
  }

  addValue(val) {
    this.value += val;
  }

  getValue() {
    return this.value;
  }

  getPercentage() {
    return (this.value / this._maxValue) * 100;
  }

  update(tsp) {
    const newValue = this.value - this._modValue;

    this.value = clamp(newValue, 0, this._maxValue);
  }
}
