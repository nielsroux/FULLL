"use strict";

const { Given, When, Then, Before } = require("@cucumber/cucumber");
const User = require("../../src/Domain/User.js");
const Fleet = require("../../src/Domain/Fleet.js");
const Vehicle = require("../../src/Domain/Vehicle.js");
const database = require("../../src/Infra/repositories/InMemoryFleets.js");

Before(function () {
    this.myUser = new User("user1", "Niels", "Roux");
    this.db = database;
});

Given("my fleet", function () {
    this.myFleet = new Fleet("fleet1", this.myUser.id, []);
    this.db.createFleet(this.myFleet);
});
Given("a vehicle", function () {
    this.myCar = new Vehicle("car1", "AA-AAA-AA", "car", false);
    this.db.createVehicle(this.myCar);
});
Given("I have registered this vehicle into my fleet", function () {
    this.myFleet.registerVehicle(this.myCar);
});
Given("the fleet of another user", function () {
    this.otherFleet = new Fleet("otherFleet", this.myUser.id, []);
    this.db.createFleet(this.otherFleet);
});
Given("this vehicle has been registered into the other user's fleet", function () {
    this.otherFleet.registerVehicle(this.myCar);
});

When("I register this vehicle into my fleet", function () {
    this.myFleet.registerVehicle(this.myCar);
});
When("I try to register this vehicle into my fleet", function () {
    this.registerResult = this.myFleet.registerVehicle(this.myCar);
});

Then("this vehicle should be part of my vehicle fleet", function () {
    const dbFleet = this.db.fleets.get(this.myFleet.id);
    if (dbFleet.getVehicle(this.myCar) !== this.myCar) {
        throw new Error(`"${this.myCar.id}" is not part of "${this.myFleet.id}"`);
    }
    if (this.otherFleet && !this.otherFleet.getVehicle(this.myCar)) {
        throw new Error(`"${this.myCar.id}" is not part of "${this.otherFleet.id}"`);
    }
});
Then("I should be informed this vehicle has already been registered into my fleet", function () {
    if (this.registerResult === false) {
        console.log(`"${this.myCar.id}" has already been registered into "${this.myFleet.id}"`);
    }
});
