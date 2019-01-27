export default class Text {
  constructor(text = '', revealed = false) {
    this.text = text;
    this.revealed = revealed;
    this.length = text.length;

    this._setup();
  }

  _setup() {
    const node = document.createElement('p');
    node.className = 'text';
    document.body.append(node);

    this.text.split('').forEach((char, i) => {
      const charNode = document.createElement('span');
      charNode.className = `text-char char-${i}`;
      charNode.innerText = char;
      charNode.style.opacity = 0;

      node.append(charNode);
    });

    this.node = node;
  }

  _toggleChar(i = 0, speed = 50) {
    const charNodes = this.node.children;
    const charNode = charNodes[i];
    const currentOpacity = charNode.style.opacity;

    charNode.style.opacity = Number(currentOpacity) === 0 ? 1 : 0;

    if (i < this.length - 1) {
      const nextChar = this.text.charAt(i + 1);

      if (nextChar === ' ') {
        return this._toggleChar(i + 1);
      }

      return setTimeout(() => this._toggleChar(i + 1), speed);
    }

    this.revealed = true;
  }

  reveal(speed = 50) {
    this._toggleChar(0, speed);
  }

  hide(speed = 50) {
    this._toggleChar(0, speed);
  }
}
