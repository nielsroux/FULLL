import type { Arguments, CommandBuilder } from 'yargs'
import { Container } from 'inversify'
import { applicationContainerModule } from '@app/container'
import { infrastructureContainerModule } from '@infra/container'
import { TYPES } from '@constants/types'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { Fleet } from '@domain/fleet/Fleet'
import { VehicleApplication } from '@app/controllers/vehicle/VehicleApplication'

type Options = {
  fleetId: string
  vehiclePlateNumber: string
  lat: string
  lng: string
}

export const command: string =
  'localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>'
export const desc: string =
  'Park a vehicle with <fleetId>, <vehiclePlateNumber>, <lat> and <lng>'

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('fleetId', { type: 'string', demandOption: true })
    .positional('vehiclePlateNumber', { type: 'string', demandOption: true })
    .positional('lat', { type: 'string', demandOption: true })
    .positional('lng', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fleetId, vehiclePlateNumber, lat, lng } = argv

  const container = new Container()
  container.load(applicationContainerModule)
  await container.loadAsync(infrastructureContainerModule)

  const fleetApplication = container.get<FleetApplication>(
    TYPES.FleetApplication
  )
  const vehicleApplication = container.get<VehicleApplication>(
    TYPES.VehicleApplication
  )

  let response: string

  const fleetDto = await fleetApplication.getFleetById(fleetId)

  const vehicleDto = await vehicleApplication.getVehicleByPlateNumber(
    vehiclePlateNumber
  )
  if (vehicleDto === null) {
    throw new Error(`The vehicle with the requested plateNumber does not exist`)
  }

  const fleet = Fleet.create(fleetDto, fleetDto.guid)
  if (!fleet.containsVehicle(vehicleDto.guid))
    throw new Error(
      `The fleet with the requested ID does not contain the vehicle`
    )

  const result = await vehicleApplication.localizeVehicle({
    vehicleDto,
    latitude: lat,
    longitude: lng,
  })

  if (result === null)
    response = `The vehicle is already park at this location : '${lat}', '${lng}'`
  else response = `The location vehicle has been updated to '${lat}', '${lng}'`

  process.stdout.write(response)
  process.exit(0)
}
