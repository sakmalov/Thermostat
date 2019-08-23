'use strict';

describe('Thermostat', function() {

    var thermostat;

    beforeEach(function() {
        thermostat = new Thermostat();
    });

    it('starts at 20 degrees', function() {
        expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    it('increases in temperature with up()', function() {
        thermostat.up();
        expect(thermostat.getCurrentTemperature()).toEqual(21);
    });

    it('decreases in temperature with down()', function() {
        thermostat.down();
        expect(thermostat.getCurrentTemperature()).toEqual(19);
    });

    it('has a minimum temperature of 10', function() {
        for(var i =0; i<11; i++) {
          thermostat.down();
        }
        expect(thermostat.getCurrentTemperature()).toEqual(10);
    });

    it('has power saving mode on by default', function() {
        expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('is able to switch off power saving mode', function() {
        thermostat.switchPowerSavingModeOff();
        expect(thermostat.isPowerSavingModeOn()).toBe(false);
    });

    it('is able to switch power saving mode on', function() {
        thermostat.switchPowerSavingModeOff();
        expect(thermostat.isPowerSavingModeOn()).toBe(false);
        thermostat.switchPowerSavingModeOn();
        expect(thermostat.isPowerSavingModeOn()).toBe(true);
    });

    it('can reset to default temperature', function() {
        thermostat.up();
        expect(thermostat.getCurrentTemperature()).toEqual(21);
        thermostat.resetTemperature();
        expect(thermostat.getCurrentTemperature()).toEqual(20);
    });

    describe('Power Saving mode on', function(){
        it('has a maximum temperature of 25 degrees', function() {
            for(var i =0; i<6; i++) {
                thermostat.up();
            }
            expect(thermostat.getCurrentTemperature()).toEqual(25);
        });
    });

    describe('Power Saving mode off', function(){
        it('has a maximum temperature of 32 degrees', function() {
          thermostat.switchPowerSavingModeOff();
          for(var i=0; i<13; i++) {
              thermostat.up();
          }
          expect(thermostat.getCurrentTemperature()).toEqual(32);
        });
    });

    describe('Energy Usage', function(){
        describe('when the temperature is below 18 degrees', function() {
            it('is considered low-usage', function() {
                for(var i=0; i<4; i++) {
                    thermostat.down();
                }
                expect(thermostat.energyUsage()).toEqual('Low-Usage');
            });
        });

        describe('When the temperature is between 18-25 degrees', function(){
            it('is considered medium-usage', function(){
                expect(thermostat.energyUsage()).toEqual('Medium-Usage');
            });
        });

        describe('Whe the temperature is anything else', function(){
            it('is considered High-Usage', function() {
                thermostat.powerSavingMode = false;
                for(var i=0; i<6; i++) {
                    thermostat.up();
                }
                expect(thermostat.energyUsage()).toEqual('High-Usage');
            });
        });
    });
});
