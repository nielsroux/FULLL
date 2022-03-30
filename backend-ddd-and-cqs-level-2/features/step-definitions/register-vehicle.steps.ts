import { after, before, binding, given, then, when } from 'cucumber-tsflow'
import { loadContainer } from '../../src/loadContainer'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { TYPES } from '@constants/types'
import { VehicleApplication } from '@app/controllers/vehicle/VehicleApplication'
import { Fleet } from '@domain/fleet/Fleet'
import { Vehicle } from '@domain/vehicle/Vehicle'
import { assert } from 'chai'

@binding()
export class RegisterVehicleSteps {
  private fleetController!: FleetApplication
  private vehicleController!: VehicleApplication

  private myFleet!: Fleet
  private myVehicle!: Vehicle
  private otherFleet!: Fleet

  private registerVehicle!: any

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
    const fleet = new Fleet({ userId: 'user1', vehicleIds: [] })
    this.myFleet = await this.fleetController.createFleet(fleet)
  }

  @given('a vehicle')
  public async givenAVehicle() {
    const vehicle = new Vehicle({
      plateNumber: 'AA-AAA-AA',
      location: undefined,
    })
    this.myVehicle = await this.vehicleController.createVehicle(vehicle)
  }

  @given('the fleet of another user')
  public async givenTheFleetOfAnotherUser() {
    const fleet = new Fleet({ userId: 'user2', vehicleIds: [] })
    this.otherFleet = await this.fleetController.createFleet(fleet)
  }

  @given("this vehicle has been registered into the other user's fleet")
  public async givenVehicleRegisteredIntoOtherFleet() {
    await this.fleetController.registerVehicle({
      fleetId: this.otherFleet.guid,
      vehicleId: this.myVehicle.guid,
    })
  }

  @given('I have registered this vehicle into my fleet')
  public async givenRegisteredThisVehicleIntoMyFleet() {
    await this.fleetController.registerVehicle({
      fleetId: this.myFleet.guid,
      vehicleId: this.myVehicle.guid,
    })
  }

  @when('I register this vehicle into my fleet')
  public async registerVehicleIntoFleet() {
    this.registerVehicle = await this.fleetController.registerVehicle({
      fleetId: this.myFleet.guid,
      vehicleId: this.myVehicle.guid,
    })
  }

  @when('I try to register this vehicle into my fleet')
  public async iTryToregisterVehicleIntoFleet() {
    this.registerVehicle = await this.fleetController.registerVehicle({
      fleetId: this.myFleet.guid,
      vehicleId: this.myVehicle.guid,
    })
  }

  @then('this vehicle should be part of my vehicle fleet')
  public async vehicleShouldBePartOfFleet() {
    const myFleetUpdate = await this.fleetController.getFleetById(
      this.myFleet.guid
    )
    assert.include(myFleetUpdate.vehicleIds, this.myVehicle.guid)

    if (this.otherFleet) {
      const otherFleetUpdate = await this.fleetController.getFleetById(
        this.otherFleet.guid
      )
      assert.include(otherFleetUpdate.vehicleIds, this.myVehicle.guid)
    }
  }

  @then(
    'I should be informed this vehicle has already been registered into my fleet'
  )
  public async thenIShouldBeInformedVehicleAlreadyRegistered() {
    if (this.registerVehicle === null)
      console.log('this vehicle has already been registered into my fleet')
  }
}
