import { binding, given, then, when } from 'cucumber-tsflow'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { VehicleApplication } from '@app/controllers/vehicle/VehicleApplication'
import { Fleet } from '@domain/fleet/Fleet'
import { assert } from 'chai'
import { SharingSteps } from './sharing.steps'

@binding([SharingSteps])
export class RegisterVehicleSteps {
  private fleetController!: FleetApplication
  private vehicleController!: VehicleApplication
  private otherFleet!: Fleet
  private registerVehicle!: any

  constructor(protected sharingSteps: SharingSteps) {
    this.fleetController = this.sharingSteps.fleetController
    this.vehicleController = this.sharingSteps.vehicleController
  }

  @given('the fleet of another user')
  public async givenTheFleetOfAnotherUser() {
    const fleet = Fleet.create(
      { userId: 'user2', vehicleIds: [] },
      '65223a15-be25-4c30-b807-bb992cb8aad2'
    )
    this.otherFleet = await this.fleetController.saveFleet({ fleet })
  }

  @given("this vehicle has been registered into the other user's fleet")
  public async givenVehicleRegisteredIntoOtherFleet() {
    await this.fleetController.registerVehicle({
      fleetId: this.otherFleet.guid,
      vehicleId: this.sharingSteps.myVehicle.guid,
    })
  }

  @when('I register this vehicle into my fleet')
  public async registerVehicleIntoFleet() {
    await this.fleetController.registerVehicle({
      fleetId: this.sharingSteps.myFleet.guid,
      vehicleId: this.sharingSteps.myVehicle.guid,
    })
  }

  @when('I try to register this vehicle into my fleet')
  public async iTryToregisterVehicleIntoFleet() {
    this.registerVehicle = await this.fleetController.registerVehicle({
      fleetId: this.sharingSteps.myFleet.guid,
      vehicleId: this.sharingSteps.myVehicle.guid,
    })
  }

  @then('this vehicle should be part of my vehicle fleet')
  public async vehicleShouldBePartOfFleet() {
    const myFleetUpdate = await this.fleetController.getFleetById(
      this.sharingSteps.myFleet.guid
    )
    assert.include(myFleetUpdate.vehicleIds, this.sharingSteps.myVehicle.guid)

    if (this.otherFleet) {
      const otherFleetUpdate = await this.fleetController.getFleetById(
        this.otherFleet.guid
      )
      assert.include(
        otherFleetUpdate.vehicleIds,
        this.sharingSteps.myVehicle.guid
      )
    }
  }

  @then(
    'I should be informed this vehicle has already been registered into my fleet'
  )
  public async thenIShouldBeInformedVehicleAlreadyRegistered() {
    if (this.registerVehicle === null)
      console.log(`this vehicle has already been registered into my fleet`)
  }
}
