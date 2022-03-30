import { injectable } from 'inversify'
import { IDataMapper } from '@core/IDataMapper'
import { Vehicle } from '@domain/vehicle/Vehicle'

@injectable()
export class VehicleDataMapper implements IDataMapper<Vehicle> {
  toDomain(vehicle: any) {
    const { guid, plateNumber, location } = vehicle
    return Vehicle.create({ plateNumber, location }, guid)
  }

  toDalEntity(vehicleEntity: Vehicle) {
    return {
      guid: vehicleEntity.guid,
      plateNumber: vehicleEntity.plateNumber,
      location: vehicleEntity.location
        ? vehicleEntity.location.coordinates
        : vehicleEntity.location,
    }
  }
}
