import "@babel/polyfill"
import { Graphics } from './engine/graphics';
import { RenderedItem } from './engine/renderedItem';
import { Layer } from './engine/layer';
import { Background } from './objects/background';
import State from './State/State';
import image from '../assets/images/bg_space.png'
import Player from "./State/player";

window.addEventListener('load', () => {
  const state = new State();
  const graphics =
    new Graphics(
      [
        new Layer(
          [
            new Background(state.player, 1),
            new Background(state.player, 2),
            new Background(state.player, 3)
          ]),
        new Layer([state])
      ]);
});
