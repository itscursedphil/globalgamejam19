import "@babel/polyfill"
import {Graphics} from './engine/graphics';
import {RenderedItem} from './engine/renderedItem';
import {Layer} from './engine/layer';
import {Background} from './backgound';
import State from './State/State';
import image from '../assets/images/bg_space.png'

window.addEventListener('load', () => {
	const graphics =
        new Graphics(
          [
            new Layer([new Background(image), new State()])
          ]);
});
