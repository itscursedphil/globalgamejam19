// Packages
import '@babel/polyfill';

// Assets
import img from '../assets/img/test.png';

// Modules
import SpriteSheet from './SpriteSheet';
import Sprite from './Sprite';

window.addEventListener('load', async () => {
  const canvas = document.querySelector('#canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const sheet = new SpriteSheet(img, 64, 64);
  await sheet.load();

  const sprite = new Sprite(sheet, 2, 2);
  sprite.render(ctx, 100, 100, 68);

  const sprite2 = new Sprite(sheet, 0, 0);
  sprite2.render(ctx, 400, 400, 45);
});
