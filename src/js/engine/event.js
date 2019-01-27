export default class Event {
  constructor(delay, handleEvent) {
    this._delay = delay;
    this._handleEvent = handleEvent;

    this._timeElapsed = 0;
  }

  update(tsp) {
    this._timeElapsed += 60 + (Number(tsp) - 60);

    if (this._timeElapsed >= this._delay) this._handleEvent();
  }
}
