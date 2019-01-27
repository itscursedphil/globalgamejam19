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
const items = [];

// Spritesheets
const spriteSheetObjects = new SpriteSheet(spriteSheetObjectsSource, 512, 512);
const itemsSheet = new SpriteSheet(itemsImage, 128, 128);

// Sprites
// Oxygen
const oxygenSprite = new Sprite(itemsSheet, 0, 0);
// Fuel
const fuelSprite1 = new Sprite(itemsSheet, 0, 3, 0.5);
const fuelSprite2 = new Sprite(itemsSheet, 1, 3, 0.5);
const fuelSprite3 = new Sprite(itemsSheet, 2, 3, 0.5);
const fuelSprite4 = new Sprite(itemsSheet, 3, 3, 0.5);
const fuelSprite5 = new Sprite(itemsSheet, 0, 3, 0.5);
const fuelSprite6 = new Sprite(itemsSheet, 1, 3, 0.5);
const fuelSprite7 = new Sprite(itemsSheet, 2, 3, 0.5);
const fuelSprite8 = new Sprite(itemsSheet, 3, 3, 0.5);
// Supply
const supplySprite1 = new Sprite(itemsSheet, 0, 1, 0.5);
const supplySprite2 = new Sprite(itemsSheet, 1, 1, 0.5);
const supplySprite3 = new Sprite(itemsSheet, 2, 1, 0.5);
const supplySprite4 = new Sprite(itemsSheet, 3, 1, 0.5);

// AnimatedSprites
// Oxygen
const oxygenAnim = new AnimatedSprite();
oxygenAnim.addState('default', [oxygenSprite], 50);
oxygenAnim.setState('default');
// Fuel
const fuelAnim = new AnimatedSprite();
fuelAnim.addState(
  'default',
  [
    fuelSprite1,
    fuelSprite2,
    fuelSprite3,
    fuelSprite4,
    fuelSprite5,
    fuelSprite6,
    fuelSprite7,
    fuelSprite8
  ],
  5
);
fuelAnim.setState('default');
// Supply
const supplyAnim = new AnimatedSprite();
supplyAnim.addState(
  'default',
  [supplySprite1, supplySprite2, supplySprite3, supplySprite4],
  5
);
supplyAnim.setState('default');

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
  new ResourceSpawner(resources.oxygen, player, (x, y) => {
    const item = new ResourceItem(resources.oxygen, x, y, oxygenAnim);
    items.push(item);
  }),
  new ResourceSpawner(resources.fuel, player, (x, y) => {
    const item = new ResourceItem(resources.fuel, x, y, fuelAnim);
    items.push(item);
  }),
  new ResourceSpawner(resources.supplies, player, (x, y) => {
    const item = new ResourceItem(resources.supplies, x, y, supplyAnim);
    items.push(item);
  })
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

  spawners.forEach(spawner => spawner.update(tps));

  items.forEach(item => item.update(tps, player));
});

game.render(ctx => {
  layers.forEach(layer => layer.render(ctx));
  items.forEach(item => item.render(ctx));
});
