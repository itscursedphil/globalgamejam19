import '@babel/polyfill';

import img from '../assets/images/test.png';

import { Graphics } from './engine/graphics';
import { RenderedItem } from './engine/renderedItem';
import { Layer } from './engine/layer';
import SpriteSheet from './engine/spriteSheet';
import Sprite from './engine/sprite';
import Animation from './engine/animatedSprite';

window.addEventListener('load', async () => {
  const sheet = new SpriteSheet(img, 64, 64);
  const sprite1 = new Sprite(sheet, 0, 0);
  const sprite2 = new Sprite(sheet, 1, 1);
  const sprite3 = new Sprite(sheet, 3, 3);
  const sprite4 = new Sprite(sheet, 3, 1);
  const sprite5 = new Sprite(sheet, 1, 1);
  const sprite6 = new Sprite(sheet, 4, 4);
  const animation = new Animation();

  animation.addState('anim1', [sprite1, sprite2, sprite3]);
  animation.addState('anim2', [sprite4, sprite5, sprite6]);
  animation.setState('anim1');

  setTimeout(() => animation.setState('anim2'), 4000);

  await sheet.load();

  const graphics = new Graphics([new Layer([animation])]);
});
