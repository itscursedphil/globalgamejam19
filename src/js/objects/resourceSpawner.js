import Event from '../engine/event';
import Vector2 from '../vector2';

export default class ResourceSpawner {
  constructor(resource, player, onSpawn) {
    this.resource = resource;
    this._player = player;
    this._onSpawn = onSpawn;
    this._baseSpawnDelay = 12000;
    this._prevPlayerPos = new Vector2(
      player.position.x + player.rposition.x,
      player.position.y + player.rposition.y
    );

    this._createSpawnEvent();
  }

  _shouldSpawn() {
    const chance = Math.random() > 0.4;

    return chance;
  }

  _calcSpawnDelay() {
    // Spawn quicker if resource is low
    const resourceMod = 1 + this.resource.value * 0.2 - 0.4;
    // Random value between 0.8 and 1.2
    const timeMod = 1 + Math.random() * 0.4 - 0.8;

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
    const dist = 100;

    const randX = Math.floor(Math.random() * 400) - 800;
    const randY = Math.floor(Math.random() * 400) - 800;

    const playerPosX = this._player.position.x - this._player.rposition.x;
    const playerPosY = this._player.position.y + this._player.rposition.y;

    const travelX = playerPosX + this._prevPlayerPos.x;
    const travelY = playerPosY + this._prevPlayerPos.y;

    const posX = 0 + travelX * -dist;
    const posY = 0 + travelY * -dist;

    this._onSpawn(posX, posY);
  }

  update(tsp) {
    this._spawnEvent.update(tsp);
    this._prevPlayerPos = new Vector2(
      this._player.position.x - this._player.rposition.x,
      this._player.position.y + this._player.rposition.y
    );
  }
}
