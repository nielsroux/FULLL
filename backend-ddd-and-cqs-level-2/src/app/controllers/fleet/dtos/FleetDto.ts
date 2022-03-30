export class FleetDto {
  constructor(
    public guid: string,
    public userId: string,
    public vehicleIds: Array<string>
  ) {}
}
