import { IRepository } from '@core/IRepository'
import { Vehicle } from './Vehicle'

export interface IVehicleRepository extends IRepository<Vehicle> {
  findByPlateNumber(plateNumber: string): Promise<Vehicle | null>
}
