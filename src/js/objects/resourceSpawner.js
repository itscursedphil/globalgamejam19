import Event from '../engine/event';
import Vector2 from '../vector2';

export default class ResourceSpawner {
  constructor(resource, player) {
    this.resource = resource;
    this._player = player;
    this._baseSpawnDelay = 4000;
    this._prevPlayerPos = new Vector2(
      player.position.x + player.rposition.x,
      player.position.y + player.rposition.x
    );

    this._createSpawnEvent();
  }

  _shouldSpawn() {
    const chance = Math.random() > 0.2;

    return chance;
  }

  _calcSpawnDelay() {
    // Spawn quicker if resource is low
    const resourceMod = 1 + this.resource.value * 0.4 - 0.2;
    // Random value between 0.8 and 1.2
    const timeMod = 1 + Math.random() * 0.4 - 0.2;

    return this._baseSpawnDelay * resourceMod * timeMod;
  }

  _createSpawnEvent() {
    const spawnDelay = this._calcSpawnDelay();

    this._spawnEvent = new Event(spawnDelay, () => {
      if (this._shouldSpawn()) this._spawn();

      this._createSpawnEvent();
    });
  }

  _spawn() {
    const dist = window.innerWidth;

    const playerPosX = this._player.position.x + this._player.rposition.x;
    const playerPosY = this._player.position.y + this._player.rposition.y;

    const travelX = playerPosX - this._prevPlayerPos.x;
    const travelY = playerPosY - this._prevPlayerPos.y;

    const posX = playerPosX + travelX * dist;
    const posY = playerPosY + travelY * dist;

    // Console.log(posX, posY);
  }

  update(tsp) {
    this._spawnEvent.update(tsp);
    this._prevPlayerPos = new Vector2(
      this._player.position.x + this._player.rposition.x,
      this._player.position.y + this._player.rposition.y
    );
  }
}
