import type { Arguments, CommandBuilder } from 'yargs'
import { Container } from 'inversify'
import { applicationContainerModule } from '@app/container'
import { infrastructureContainerModule } from '@infra/container'
import { TYPES } from '@constants/types'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { Fleet } from '@domain/fleet/Fleet'
import { VehicleApplication } from '@app/controllers/vehicle/VehicleApplication'
import { Vehicle } from '@domain/vehicle/Vehicle'

type Options = {
  fleetId: string
  vehiclePlateNumber: string
}

export const command: string = 'register-vehicle <fleetId> <vehiclePlateNumber>'
export const desc: string =
  'Register a vehicle into a fleet with <fleetId> and <vehiclePlateNumber>'

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('fleetId', { type: 'string', demandOption: true })
    .positional('vehiclePlateNumber', { type: 'string', demandOption: true })

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { fleetId, vehiclePlateNumber } = argv

  const container = new Container()
  container.load(applicationContainerModule)
  await container.loadAsync(infrastructureContainerModule)

  const fleetApplication = container.get<FleetApplication>(
    TYPES.FleetApplication
  )
  const vehicleApplication = container.get<VehicleApplication>(
    TYPES.VehicleApplication
  )

  const vehicle: Vehicle = await vehicleApplication.createVehicle({
    plateNumber: vehiclePlateNumber,
  })

  const fleet: Fleet | null = await fleetApplication.registerVehicle({
    fleetId: fleetId,
    vehicleId: vehicle.guid,
  })

  let response: string
  if (fleet === null)
    response = `Vehicle Guid: ${vehicle.guid} already added to this fleet`
  else
    response = `Vehicle Guid: ${vehicle.guid} has been added to Fleet Guid: ${fleet.guid}`

  process.stdout.write(response)
  process.exit(0)
}
