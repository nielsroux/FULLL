import { Entity } from '@core/Entity'
import { IAggregateRoot } from '@core/IAggregateRoot'

export interface IFleetProps {
  userId: string
  vehicleIds: Array<string>
}

export class Fleet extends Entity<IFleetProps> implements IAggregateRoot {
  private _userId: string
  private _vehicleIds: Array<string>

  constructor({ userId, vehicleIds }: IFleetProps, guid?: string) {
    super(guid)
    this._userId = userId
    this._vehicleIds = vehicleIds
  }

  get userId() {
    return this._userId
  }

  get vehicleIds() {
    return this._vehicleIds
  }

  public setVehicle(vehicleId: string) {
    if (!this.containsVehicle(vehicleId)) {
      this.vehicleIds.push(vehicleId)
      return true
    }
    return false
  }

  public containsVehicle(vehicleId: string) {
    return this.vehicleIds.includes(vehicleId) ? true : false
  }

  public static create(props: IFleetProps, guid?: string) {
    return new Fleet(props, guid)
  }
}
