export default class AnimatedSprite {
  constructor() {
    this.states = {};
    this.currentState = '';
    this.ticks = 0;
  }

  addState(name = '', sprites = [], stepLength = 15) {
    const state = {
      name,
      sprites,
      stepLength,
      currentStep: 0
    };

    this.states[name] = state;
  }

  setState(name = '') {
    if (this.currentState) this.currentState.currentStep = 0;

    this.currentState = this.states[name];

    if (!this.currentState) throw new Error('State not set!');

    return this.currentState;
  }

  getCurrentState() {
    return this.currentState;
  }

  getCurrentStep() {
    return this.getCurrentState().currentStep;
  }

  getCurrentSprite() {
    const currentState = this.getCurrentState();
    const currentStep = this.getCurrentStep();

    return currentState.sprites[currentStep];
  }

  update(tps) {
    const currentState = this.getCurrentState();

    if (!currentState) return;

    this.ticks = Math.floor(this.ticks + tps);

    if (this.ticks >= currentState.stepLength * 60) {
      currentState.currentStep =
        (currentState.currentStep + 1) % currentState.sprites.length;

      this.ticks = this.ticks % currentState.stepLength;
    }
  }

  render(ctx, posX = 0, posY = 0, rotation = 0) {
    const { currentState } = this;

    if (!currentState) return;

    this.getCurrentSprite().render(ctx, posX, posY, rotation);
  }
}
