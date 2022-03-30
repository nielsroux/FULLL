import { IRepository } from '@core/IRepository'
import { Vehicle } from '@domain/vehicle/Vehicle'
import { Fleet } from './Fleet'

export interface IFleetRepository extends IRepository<Fleet> {
  registerVehicle(fleetId: string, vehicleId: string): Promise<Fleet | null>

  localizeVehicle(
    fleetId: string,
    plateNumber: string,
    latitude: string,
    longitude: string
  ): Promise<Vehicle>
}
