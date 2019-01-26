import Sound from './sound';

export default class SoundManager {
	constructor() {
		this.runningSounds = [];
		this.interval = setInterval(() => this.checkRunning(), 10);
	}

	checkRunning() {
		this.runningSounds.forEach((e, i) => this.checkRunningFor(e, i));
	}

	checkRunningFor(element = new Sound(), index = 0, array = []) {
		if (!element.playing()) {
			array.splice(index);
		}
	}

	addLayer(url = '', volume = 1) {
		const newobj = new Sound(url, volume);
		this.runningSounds.push(newobj);
		return newobj;
	}

	pauseAll() {
		this.runningSounds.forEach(element => {
			element.pause();
		});
	}

	playAll() {
		this.runningSounds.forEach(element => {
			element.play();
		});
	}

	stopAll() {
		this.runningSounds.forEach(element => {
			element.stop();
		});
	}

	fadeOutAll(seconds = 0) {
		this.runningSounds.forEach(element => {
			element.fadeOut(seconds);
		});
	}

	fadeInAll(seconds = 0) {
		this.runningSounds.forEach(element => {
			element.fadeIn(seconds);
		});
	}

	loadAll() {
		this.runningSounds.forEach(element => {
			if (!element.loaded) {
				element.load();
			}
		});
	}
}
