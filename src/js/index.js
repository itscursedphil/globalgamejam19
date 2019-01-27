import "@babel/polyfill"
import { Layer } from './engine/layer';
import { Background } from './objects/background';
import spriteSheetObjectsSource from '../assets/images/spr_assets_512.png'
import Player from "./objects/player";
import { Game } from "./game";
import SpriteSheet from "./engine/spriteSheet";

const game = new Game();
const spriteSheetObjects = new SpriteSheet(spriteSheetObjectsSource, 512, 512);
const player = new Player(spriteSheetObjects);
const layers =
  [
    new Layer(
      [
        new Background(player, 1),
        new Background(player, 2),
        new Background(player, 3)
      ]),
    new Layer(
      [
        player
      ]
    )
  ];

game.initialize(async () => {
  await spriteSheetObjects.load();  
  for (const layer of layers) {
    await layer.initialize();
  }
});

game.update((tps) => {
  for (const layer of layers) {
    layer.update(tps);
  }
});

game.render((ctx) => {
  for (const layer of layers) {
    layer.render(ctx);
  }
});