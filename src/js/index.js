import '@babel/polyfill';

import spriteSheetObjectsSource from '../assets/images/spr_assets_512.png';
import itemsImage from '../assets/images/spr_assets_128.png';
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
import Sprite from './engine/sprite';
import AnimatedSprite from './engine/animatedSprite';
import ResourceItem from './objects/resourceItem';

const game = new Game();
const ui = new UI();

const resources = {
  oxygen: new Resource('oxygen'),
  fuel: new Resource('fuel'),
  supplies: new Resource('supplies')
};

// Spritesheets
const spriteSheetObjects = new SpriteSheet(spriteSheetObjectsSource, 512, 512);
const itemsSheet = new SpriteSheet(itemsImage, 128, 128);

// Sprites
const resourceSprite1 = new Sprite(itemsSheet, 0, 1, 0.5);
const resourceSprite2 = new Sprite(itemsSheet, 1, 1, 0.5);
const resourceSprite3 = new Sprite(itemsSheet, 2, 1, 0.5);
const resourceSprite4 = new Sprite(itemsSheet, 3, 1, 0.5);

// AnimatedSprites
const resourceAnim = new AnimatedSprite();
resourceAnim.addState(
  'default',
  [resourceSprite1, resourceSprite2, resourceSprite3, resourceSprite4],
  5
);
resourceAnim.setState('default');

const resourceItem = new ResourceItem(resources.oxygen, 100, 100, resourceAnim);

const player = new Player(spriteSheetObjects);

// Layers
const layers = [
  new Layer([
    new Background(player, 1),
    new Background(player, 2),
    new Background(player, 3)
  ]),
  new Layer([player])
];

// Spawners
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
    itemsSheet.load(),
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

  resourceItem.update(tps, player);
});

game.render(ctx => {
  layers.forEach(layer => layer.render(ctx));

  resourceItem.render(ctx);
});
