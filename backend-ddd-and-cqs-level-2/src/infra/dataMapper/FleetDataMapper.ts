import { injectable } from 'inversify'
import { IDataMapper } from '@core/IDataMapper'
import { Fleet } from '@domain/fleet/Fleet'

@injectable()
export class FleetDataMapper implements IDataMapper<Fleet> {
  toDomain(fleet: any) {
    const { guid, userId, vehicleIds } = fleet
    return Fleet.create({ userId, vehicleIds }, guid)
  }

  toDalEntity(fleetEntity: Fleet) {
    return {
      guid: fleetEntity.guid,
      userId: fleetEntity.userId,
      vehicleIds: fleetEntity.vehicleIds,
    }
  }
}
