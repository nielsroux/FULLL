import { injectable, inject } from 'inversify'
import { TYPES } from '@constants/types'
import { FleetDto } from './dtos/FleetDto'
import { IFleetRepository } from '@domain/fleet/IFleetRepository'
import { Fleet } from '@domain/fleet/Fleet'

@injectable()
export class FleetApplication {
  constructor(
    @inject(TYPES.FleetRepository)
    private readonly fleetRepository: IFleetRepository
  ) {}

  async getFleetById(id: string): Promise<any | null> {
    const fleet = await this.fleetRepository.findOneById(id)

    if (!fleet)
      throw new Error('The fleet with the requested ID does not exist')
    return new FleetDto(fleet.guid, fleet.userId, fleet.vehicleIds)
  }

  async createFleet({ userId }: any): Promise<Fleet> {
    const fleet = Fleet.create({ userId, vehicleIds: [] })
    await this.fleetRepository.save(fleet)
    return fleet
  }

  async saveFleet({ fleet }: any): Promise<Fleet> {
    await this.fleetRepository.save(fleet)
    return fleet
  }

  async registerVehicle({ fleetId, vehicleId }: any): Promise<Fleet | null> {
    const fleetDto = await this.getFleetById(fleetId)
    const fleet = Fleet.create(fleetDto, fleetDto.guid)
    if (!fleet.setVehicle(vehicleId)) return null

    await this.fleetRepository.save(fleet)
    return fleet
  }
}
