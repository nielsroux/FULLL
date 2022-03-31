import { binding, given, then, when } from 'cucumber-tsflow'
import { assert } from 'chai'
import { Localization } from '@domain/localization/Localization'
import { SharingSteps } from './sharing.steps'

@binding([SharingSteps])
export class ParkVehicleSteps {
  private myLocation!: Localization
  private parkResult!: any

  constructor(protected sharingSteps: SharingSteps) {}

  @given('a location')
  public async givenALocation() {
    this.myLocation = Localization.create({
      latitude: '49.440300961423866',
      longitude: '1.0949937090718642',
    })
  }

  @given('my vehicle has been parked into this location')
  public async givenVehicleParkedIntoLocation() {
    await this.sharingSteps.vehicleController.localizeVehicle({
      vehicleDto: this.sharingSteps.myVehicle,
      latitude: this.myLocation.latitude,
      longitude: this.myLocation.longitude,
    })
  }

  @when('I park my vehicle at this location')
  public async whenParkVehicleAtLocation() {
    await this.sharingSteps.vehicleController.localizeVehicle({
      vehicleDto: this.sharingSteps.myVehicle,
      latitude: this.myLocation.latitude,
      longitude: this.myLocation.longitude,
    })
  }

  @when('I try to park my vehicle at this location')
  public async whenITryToParkAtLocation() {
    this.parkResult = await this.sharingSteps.vehicleController.localizeVehicle(
      {
        vehicleDto: this.sharingSteps.myVehicle,
        latitude: this.myLocation.latitude,
        longitude: this.myLocation.longitude,
      }
    )
  }

  @then('the known location of my vehicle should verify this location')
  public async thenKnownLocationOfMyVehicleShouldVerifyLocation() {
    const myVehicleDto =
      await this.sharingSteps.vehicleController.getVehicleByPlateNumber(
        this.sharingSteps.myVehicle.plateNumber
      )
    assert.equal(
      myVehicleDto.location.latitude,
      this.myLocation.latitude,
      'the known location of my vehicle does not verify this location'
    )
    assert.equal(
      myVehicleDto.location.longitude,
      this.myLocation.longitude,
      'the known location of my vehicle does not verify this location'
    )
  }

  @then(
    'I should be informed that my vehicle is already parked at this location'
  )
  public async thenIShoulbBeInformedVehicleAlreadyPark() {
    if (this.parkResult === null) {
      console.log(`My vehicle is already parked at this location`)
    }
  }
}
