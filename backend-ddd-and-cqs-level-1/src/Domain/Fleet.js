"use strict";

class Fleet {
    constructor(id, userId, vehicles = []) {
        this.id = id;
        this.userId = userId; //userId who own this fleet
        this.vehicles = vehicles; //Collection of distinct vehicles
    }

    registerVehicle(vehicle) {
        if (!this.getVehicle(vehicle)) {
            this.vehicles.push(vehicle);
            return true;
        } else {
            return false;
        }
    }

    getVehicle(vehicle) {
        return this.vehicles.includes(vehicle) ? vehicle : false;
    }
}

module.exports = Fleet;
