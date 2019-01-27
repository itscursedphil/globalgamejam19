export default class UI {
  constructor() {
    this.nodes = {
      ui: document.querySelector('#ui'),
      fuel: document.querySelector('.stat.-fuel .stat-bar'),
      oxygen: document.querySelector('.stat.-oxygen .stat-bar'),
      supplies: document.querySelector('.stat.-supplies .stat-bar')
    };
  }

  _setVal(name, val = 1) {
    const node = this.nodes[name];
    const maxWidth = node.getBoundingClientRect().width;
    const width = Math.round(maxWidth * val);
    node.setAttribute('style', `clip: rect(0, ${width}px, 10px, 0);`);
  }

  setFuel(val = 1) {
    this._setVal('fuel', val);
  }

  setOxygen(val = 1) {
    this._setVal('oxygen', val);
  }

  setSupplies(val = 1) {
    this._setVal('supplies', val);
  }
}
