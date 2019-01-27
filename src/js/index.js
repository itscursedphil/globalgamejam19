import '@babel/polyfill';
import image from '../assets/images/bg_space.png';
import { Graphics } from './engine/graphics';
import { Layer } from './engine/layer';
import { Background } from './objects/background';
import State from './State/State';
import Player from './State/player';

window.addEventListener('load', () => {
  const state = new State();
  const graphics = new Graphics([
    new Layer([
      new Background(state, 1),
      new Background(state, 2),
      new Background(state, 3)
    ]),
    new Layer([state])
  ]);
});
