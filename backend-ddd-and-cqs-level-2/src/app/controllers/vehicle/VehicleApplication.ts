import { injectable, inject } from 'inversify'
import { TYPES } from '@constants/types'
import { Vehicle } from '@domain/vehicle/Vehicle'
import { VehicleDto } from './dtos/VehicleDto'
import { IVehicleRepository } from '@domain/vehicle/IVehicleRepository'
import { Localization } from '@domain/localization/Localization'

@injectable()
export class VehicleApplication {
  constructor(
    @inject(TYPES.VehicleRepository)
    private readonly vehicleRepository: IVehicleRepository
  ) {}

  async getVehicleById(id: string): Promise<any | null> {
    const vehicle = await this.vehicleRepository.findOneById(id)
    if (!vehicle)
      throw new Error('The fleet with the requested ID does not exist')
    return new VehicleDto(vehicle.guid, vehicle.plateNumber, vehicle.location)
  }

  async getVehicleByPlateNumber(plateNumber: string): Promise<any | null> {
    const vehicle = await this.vehicleRepository.findByPlateNumber(plateNumber)
    if (!vehicle) return null
    return new VehicleDto(vehicle.guid, vehicle.plateNumber, vehicle.location)
  }

  async createVehicle({ plateNumber }: any): Promise<Vehicle> {
    const vehicleDto = await this.getVehicleByPlateNumber(plateNumber)
    if (vehicleDto) {
      return Vehicle.create(vehicleDto, vehicleDto.guid)
    } else {
      const vehicle = Vehicle.create({ plateNumber, location: undefined })
      await this.vehicleRepository.save(vehicle)
      return vehicle
    }
  }

  async localizeVehicle({
    vehicleDto,
    latitude,
    longitude,
  }: any): Promise<Vehicle | null> {
    const location = Localization.create({ latitude, longitude })
    const vehicle = Vehicle.create(vehicleDto, vehicleDto.guid)

    //console.log(location, vehicle)
    if (vehicle.isSameLocalization(location)) {
      return null
    }

    vehicle.location = location
    await this.vehicleRepository.save(vehicle)
    return vehicle
  }
}
