import '@babel/polyfill';

import spriteSheetObjectsSource from '../assets/images/spr_assets_512.png';
import soundFile from '../assets/music/snd_main_level_calm_down.mp3';

import { Layer } from './engine/layer';
import { Background } from './objects/background';
import Player from './objects/player';
import { Game } from './game';
import SpriteSheet from './engine/spriteSheet';
import Resource from './objects/resource';
import ResourceSpawner from './objects/resourceSpawner';
import UI from './engine/ui';
import Sound from './sound';

const ui = new UI();
const resources = {
  oxygen: new Resource('oxygen'),
  fuel: new Resource('fuel'),
  supplies: new Resource('supplies')
};
const game = new Game();
const spriteSheetObjects = new SpriteSheet(spriteSheetObjectsSource, 512, 512);
const player = new Player(spriteSheetObjects);
const layers = [
  new Layer([
    new Background(player, 1),
    new Background(player, 2),
    new Background(player, 3)
  ]),
  new Layer([player])
];
const spawners = [
  new ResourceSpawner(resources.oxygen, player),
  new ResourceSpawner(resources.fuel, player),
  new ResourceSpawner(resources.supplies, player)
];
const music = new Sound(soundFile);
music.load();
music.loopTimes(999);

game.initialize(async () => {
  // Wait for user
  await new Promise(resolve => {
    window.addEventListener('click', resolve);
  });

  // Preload assets
  await Promise.all([
    spriteSheetObjects.load(),
    ...layers.map(layer => layer.initialize())
  ]);

  music.play();
});

game.update(tps => {
  resources.oxygen.update(tps);
  resources.fuel.update(tps);
  resources.supplies.update(tps);

  ui.setFuel(resources.fuel.value);
  ui.setOxygen(resources.oxygen.value);
  ui.setSupplies(resources.supplies.value);

  spawners.forEach(spawner => spawner.update(tps));
  layers.forEach(layer => layer.update(tps));
});

game.render(ctx => {
  layers.forEach(layer => layer.render(ctx));
});
