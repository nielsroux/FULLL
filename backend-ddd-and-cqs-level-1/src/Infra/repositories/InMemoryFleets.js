"use strict";

class InMemoryFleets {
    constructor() {
        this.fleets = new Map();
        this.vehicles = new Map();
    }

    createFleet(fleet) {
        this.fleets.set(fleet.id, fleet);
    }

    createVehicle(vehicle) {
        this.vehicles.set(vehicle.id, vehicle);
    }
}

const database = new InMemoryFleets();
module.exports = database;
