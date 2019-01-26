import '@babel/polyfill';

import sheetImg from '../assets/images/spr_assets_512.png';

import { Graphics } from './engine/graphics';
import { RenderedItem } from './engine/renderedItem';
import { Layer } from './engine/layer';
import SpriteSheet from './engine/spriteSheet';
import Sprite from './engine/sprite';
import Animation from './engine/animatedSprite';

window.addEventListener('load', async () => {
  const sheet = new SpriteSheet(sheetImg, 512, 512);

  const idleSprite = new Sprite(sheet, 0, 7);
  const animSprite1 = new Sprite(sheet, 1, 7);
  const animSprite2 = new Sprite(sheet, 2, 7);
  const animSprite3 = new Sprite(sheet, 3, 7);
  const animSprite4 = new Sprite(sheet, 4, 7);

  // IdleSprite.showRect();
  // animSprite1.showRect();
  // animSprite2.showRect();
  // animSprite3.showRect();
  // animSprite4.showRect();

  const animation = new Animation();

  animation.addState('idle', [idleSprite]);
  animation.addState(
    'anim',
    [animSprite1, animSprite2, animSprite3, animSprite4],
    5
  );
  animation.setState('idle');

  setTimeout(() => animation.setState('anim'), 4000);

  await sheet.load();

  const graphics = new Graphics([new Layer([animation])]);
});
