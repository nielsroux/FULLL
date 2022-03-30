import { IAggregateRoot } from '@core/IAggregateRoot'

export interface ILocalizationProps {
  latitude: string
  longitude: string
}

export class Localization implements IAggregateRoot {
  private _latitude: string
  private _longitude: string

  constructor({ latitude, longitude }: ILocalizationProps) {
    this._latitude = latitude
    this._longitude = longitude
  }

  get latitude() {
    return this._latitude
  }

  get longitude() {
    return this._longitude
  }

  get coordinates() {
    return { latitude: this._latitude, longitude: this._longitude }
  }

  public static create(props: ILocalizationProps) {
    return new Localization(props)
  }
}
