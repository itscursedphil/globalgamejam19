export default class ManagedSound {
	constructor(url, volume) {
		this.url = url;
		this.maxvol = volume;
		this.loopcount = -1;
		this.loop = false;
		this.onendfunc = function () { };
	}

	load() {
		this.audio = new Audio(this.url);
		const t = this;
		this.audio.addEventListener('ended', function () {
			if (t.loopcount !== 1 && t.loop) {
				this.currentTime = 0;
				this.play();
			}

			t.loopcount--;
			t.onendfunc();
		}, false);
	}

	play() {
		this.audio.play();
		this.checkforEnd = true;
	}

	onEnd(func) {
		this.onendfunc = func;
	}

	playing() {
		return this.audio &&
            this.audio.currentTime > 0 &&
            !this.audio.paused &&
            !this.audio.ended &&
            this.audio.readyState > 2;
	}

	pause() {
		this.audio.pause();
	}

	stop() {
		this.audio.pause();
		this.audio.currentTime = 0;
	}

	fadeIn(seconds) {
		const t = this;
		this.audio.volume = 0;
		const setup = (this.maxvol - this.audio.volume) / seconds / 100;
		this.play();
		const fadeininterval = setInterval(() => {
			if (t.audio.volume + setup < 1.0) {
				t.audio.volume += setup;
			} else {
				clearInterval(fadeininterval);
			}
		}, 10);
	}

	fadeOut(seconds) {
		const t = this;
		this.audio.volume = this.maxvol;
		const setdown = this.audio.volume / seconds / 100;
		const fadeoutinterval = setInterval(() => {
			if (t.audio.volume > 0.0) {
				if (t.audio.volume - setdown < 0) {
					t.audio.volume = 0;
				} else {
					t.audio.volume -= setdown;
				}
			} else {
				clearInterval(fadeoutinterval);
			}
		}, 10);
	}

	loop(bool) {
		this.loop = bool;
	}

	loopTimes(times) {
		this.loop = true;
		this.loopcount = times;
	}
}
