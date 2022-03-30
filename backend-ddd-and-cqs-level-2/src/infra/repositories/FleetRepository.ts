import { TYPES } from '@constants/types'
import { IDataMapper } from '@core/IDataMapper'
import { Fleet } from '@domain/fleet/Fleet'
import { IFleetRepository } from '@domain/fleet/IFleetRepository'
import { Vehicle } from '@domain/vehicle/Vehicle'
import { inject } from 'inversify'
import { Db } from 'mongodb'
import { Repository } from './Repository'

export class FleetRepository
  extends Repository<Fleet>
  implements IFleetRepository
{
  constructor(
    @inject(TYPES.Db) private readonly db: Db,
    @inject(TYPES.FleetDataMapper)
    private readonly fleetDataMapper: IDataMapper<Fleet>
  ) {
    super(db.collection('fleets'), fleetDataMapper)
  }
  registerVehicle(fleetId: string, vehicleId: string): Promise<Fleet | null> {
    throw new Error('Method not implemented.')
  }

  localizeVehicle(
    fleetId: string,
    plateNumber: string,
    latitude: string,
    longitude: string
  ): Promise<Vehicle> {
    throw new Error('Method not implemented.')
  }
}
