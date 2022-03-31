import { after, before, binding, given } from 'cucumber-tsflow'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { VehicleApplication } from '@app/controllers/vehicle/VehicleApplication'
import { TYPES } from '@constants/types'
//import { loadContainer } from '../../src/loadContainer'
import { loadContainer } from '../../loadContainer'
import { Fleet } from '@domain/fleet/Fleet'
import { Vehicle } from '@domain/vehicle/Vehicle'

@binding()
export class SharingSteps {
  fleetController!: FleetApplication
  vehicleController!: VehicleApplication
  myFleet!: Fleet
  myVehicle!: Vehicle

  @before()
  public async initialize() {
    const container = await loadContainer()
    this.fleetController = container.get<FleetApplication>(
      TYPES.FleetApplication
    )
    this.vehicleController = container.get<VehicleApplication>(
      TYPES.VehicleApplication
    )
  }

  @given('my fleet')
  public async givenAFleet() {
    const fleet = Fleet.create(
      { userId: 'user1', vehicleIds: [] },
      '9a97a276-33f6-4114-b1cc-9ca1e89890fd'
    )
    this.myFleet = await this.fleetController.saveFleet({ fleet })
  }

  @given('a vehicle')
  public async givenAVehicle() {
    const plateNumber = 'AA-AAA-AA'
    this.myVehicle = await this.vehicleController.createVehicle({ plateNumber })
  }

  @given('I have registered this vehicle into my fleet')
  public async givenRegisteredThisVehicleIntoMyFleet() {
    await this.fleetController.registerVehicle({
      fleetId: this.myFleet.guid,
      vehicleId: this.myVehicle.guid,
    })
  }

  @after()
  public async close() {}
}
