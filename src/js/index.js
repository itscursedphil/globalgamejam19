// Packages
import '@babel/polyfill';

// Assets
import img from '../assets/images/test.png';

// Modules
import SpriteSheet from './engine/spriteSheet';
import Sprite from './engine/sprite';
import UI from './engine/ui';

window.addEventListener('load', async () => {
  const ui = new UI();

  setInterval(() => {
    ui.setOxygen(Math.random());
    ui.setFuel(Math.random());
    ui.setFood(Math.random());
  }, 800);

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
