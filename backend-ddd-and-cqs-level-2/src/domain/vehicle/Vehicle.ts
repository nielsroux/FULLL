import { Entity } from '@core/Entity'
import { IAggregateRoot } from '@core/IAggregateRoot'
import { Localization } from '@domain/localization/Localization'

export interface IVehicleProps {
  plateNumber: string
  location: Localization | undefined
}

export class Vehicle extends Entity<IVehicleProps> implements IAggregateRoot {
  private _plateNumber: string
  private _location: Localization | undefined

  constructor({ plateNumber, location }: IVehicleProps, guid?: string) {
    super(guid)
    this._plateNumber = plateNumber
    this._location = location
  }

  get plateNumber(): string {
    return this._plateNumber
  }

  get location(): Localization | undefined {
    return this._location
  }

  set location(localization: Localization | undefined) {
    this._location = localization
  }

  public isSameLocalization(location: Localization) {
    if (
      this.location &&
      location.latitude === this.location.latitude &&
      location.longitude === this.location.longitude
    ) {
      return true
    }
    return false
  }

  public static create(props: IVehicleProps, guid?: string) {
    return new Vehicle(props, guid)
  }
}
