"use strict";

class Vehicle {
    constructor(id, plateNumber, type, localization = false) {
        this.id = id;
        this.plateNumber = plateNumber; //vehicleName for Identification
        this.type = type; //car - truck - motocycle ...
        this.localization = localization; //Localization of the vehicle
    }

    park(localization) {
        if (!this.isSameLocalization(localization)) {
            this.localization = localization;
            return true;
        } else {
            return false;
        }
    }

    isSameLocalization(localization) {
        const { latitude, longitude } = this.localization;
        return localization.latitude === latitude && localization.longitude === longitude ? true : false;
    }
}

module.exports = Vehicle;
