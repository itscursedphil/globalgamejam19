import {posix} from 'path';
import Player from './State/player';
import Vector2 from './State/vector2';
import State from './State/State';
import EnvItem from './State/envItem';

export default class ResourceSpawner {
  constructor(player, state) {
    this.player = player;
    this.state = state;
    this.storedPlayerPos = new Vector2(player.rposition.x, player.rposition.y);
    this.interval = setInterval(() => this.spawnLoop(this), 500);
  }

  spawnLoop(t) {
    if (t.storedPlayerPos.x !== t.player.position.x || t.storedPlayerPos.y !== t.player.position.y) {
      this.spawn(t.player.position.x - t.storedPlayerPos.x, t.player.position.y - t.storedPlayerPos.y, t);
    }

    t.storedPlayerPos = new Vector2(t.player.position.x, t.player.position.y);
  }

  spawn(X = 0, Y = 0, T) {
    const distances = [];
    for (let index = 0; index < T.state.envitems.length; index++) {
      const distance = new Vector2(T.player.position.x - T.state.envitems[index].position.x, T.player.position.y - T.state.envitems[index].position.y).speed();
      distances.push(distance);
    }

    const nearest = Math.min(...distances);
    console.log(nearest);
    if (nearest > T.state.envitems.length) {
      const amount = 2;
      let genminx = 0;
      let genmaxx = 0;
      let genminy = 0;
      let genmaxy = 0;
      if (X > 0) {
        genminx = T.player.position.x + 5;
        genmaxx = T.player.position.x + 5.25;
      }

      if (X < 0) {
        genminx = T.player.position.x - 5.25;
        genmaxx = T.player.position.x - 5;
      }

      if (Y > 0) {
        genminy = T.player.position.y + 5;
        genmaxy = T.player.position.y + 5.25;
      }

      if (Y < 0) {
        genminy = T.player.position.y - 5.25;
        genmaxy = T.player.position.y - 5;
      }

      if (genminy !== 0) {
        for (let i = 0; i < amount; i++) {
          const posy = randomFloatFromInterval(genminy, genmaxy);
          const posx = randomFloatFromInterval(-1, 1);
          this.state.envitems.push(EnvItem.random(0, 0.1, posx, posy));
        }
      }

      if (genminx !== 0) {
        for (let i = 0; i < amount; i++) {
          const posx = randomFloatFromInterval(genminx, genmaxx);
          const posy = randomFloatFromInterval(-1, 1);
          this.state.envitems.push(EnvItem.random(0, 0.1, posx, posy));
        }
      }
    }
  }
}
function randomFloatFromInterval(min, max) {
  return (Math.random() * (max - min) + min);
}
