import { TYPES } from '@constants/types'
import { IDataMapper } from '@core/IDataMapper'
import { IVehicleRepository } from '@domain/vehicle/IVehicleRepository'
import { Vehicle } from '@domain/vehicle/Vehicle'
import { inject } from 'inversify'
import { Db } from 'mongodb'
import { Repository } from './Repository'

export class VehicleRepository
  extends Repository<Vehicle>
  implements IVehicleRepository
{
  constructor(
    @inject(TYPES.Db) private readonly db: Db,
    @inject(TYPES.VehicleDataMapper)
    private readonly vehicleDataMapper: IDataMapper<Vehicle>
  ) {
    super(db.collection('vehicles'), vehicleDataMapper)
  }

  async findByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
    const dbResult = await this.db
      .collection('vehicles')
      .findOne({ plateNumber })

    if (!dbResult) return null
    return this.vehicleDataMapper.toDomain(dbResult)
  }
}
