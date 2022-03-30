import { Localization } from '@domain/localization/Localization'
export class VehicleDto {
  constructor(
    public guid: string,
    public plateNumber: string,
    public location: Localization | undefined
  ) {}
}
