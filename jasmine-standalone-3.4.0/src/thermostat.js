'use strict';

function Thermostat() {
    this.temperature = 20;
    this.MINIMUM_TEMPERATURE = 10;
    this.MAXIMUM_TEMPERATURE = 25;
}

Thermostat.prototype.getCurrentTemperature = function() {
    return this.temperature;
};

Thermostat.prototype.isMinimumTemperature = function() {
    return this.temperature === this.MINIMUM_TEMPERATURE;
};

Thermostat.prototype.down = function() {
  if(this.isMinimumTemperature()) {
    return;
  }
    this.temperature -= 1;
};

Thermostat.prototype.isMaximumTemperature = function() {
    return this.temperature === this.MAXIMUM_TEMPERATURE;
};

Thermostat.prototype.up = function() {
    if(this.isMaximumTemperature()) {
        return;
    }
    this.temperature += 1;
};
