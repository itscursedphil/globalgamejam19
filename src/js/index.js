import {Graphics} from './graphics';
import {RenderedItem} from './renderedItem';
import {Layer} from './layer';

const graphics = new Graphics([new Layer([new RenderedItem()])]);

console.log(graphics.canvas.height);
