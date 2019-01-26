import {Graphics} from './graphics';
import {RenderedItem} from './renderedItem';
import {Layer} from './layer';
import {Background} from './backgound';
import State from './State/State';

window.addEventListener('load', () => {
	const graphics =
        new Graphics([new Layer([new Background('./assets/bg_space.png'), new State()])]);
});
