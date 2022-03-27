"use strict";

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const Localization = require("../../src/Domain/Localization.js");

Given("a location", function () {
    this.location = new Localization(10, 20);
});
Given("my vehicle has been parked into this location", function () {
    this.myCar.park(this.location);
});

When("I park my vehicle at this location", function () {
    this.myCar.park(this.location);
});
When("I try to park my vehicle at this location", function () {
    this.parkVehicleResponse = this.myCar.park(this.location);
});

Then("the known location of my vehicle should verify this location", function () {
    if (this.location !== this.db.vehicles.get(this.myCar.id).localization) {
        throw new Error("Car location is not like expected");
    }
});
Then("I should be informed that my vehicle is already parked at this location", function () {
    if (this.parkVehicleResponse === false) {
        console.log(`"${this.myCar.id}" is already parked at this location : "${this.location.latitude}, ${this.location.longitude}"`);
    }
});
