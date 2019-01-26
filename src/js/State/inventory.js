export default class Inventory {
	constructor() {
		this.oxygen = 0.0;
		this.supplies = 0.0;
		this.fuel = 0.0;

		this.max_oxygen = 1.0;
		this.max_supplies = 1.0;
		this.max_fuel = 1.0;

		this.usage_oxygen = 0.01;
		this.usage_supplies = 0.01;
		this.usage_fuel = 0.01;

		this.percentage_oxygen = 0.0;
		this.percentage_supplies = 0.0;
		this.percentage_fuel = 0.0;
	}

	gameTick(tps = 60) {
		if (this.oxygen > this.max_oxygen) {
			this.oxygen = this.max_oxygen;
		}

		if (this.supplies > this.max_supplies) {
			this.supplies = this.max_supplies;
		}

		if (this.fuel > this.max_fuel) {
			this.fuel = this.max_fuel;
		}

		this.oxygen -= this.usage_oxygen / tps;
		this.supplies -= this.usage_supplies / tps;
		this.fuel -= this.usage_fuel / tps;
		if (this.oxygen < 0) {
			this.oxygen = 0;
		}

		if (this.supplies < 0) {
			this.supplies = 0;
		}

		if (this.fuel < 0) {
			this.fuel = 0;
		}

		this.percentage_oxygen = (this.oxygen / this.max_oxygen) * 100;
		this.percentage_supplies = (this.supplies / this.max_supplies) * 100;
		this.percentage_fuel = (this.fuel / this.max_fuel) * 100;
	}
}
