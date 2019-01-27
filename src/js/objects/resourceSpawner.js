import Event from '../engine/event';

export default class ResourceSpawner {
  constructor(resource, player) {
    this.resource = resource;
    this.player = player;
    this._baseSpawnDelay = 4000;

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
      this._createSpawnEvent();
    });
  }

  update(tsp) {
    this._spawnEvent.update(tsp);
  }
}
