import { TYPES } from '@constants/types'
import { ContainerModule, interfaces } from 'inversify'
import { UserApplication } from '@app/controllers/user/UserApplication'
import { FleetApplication } from '@app/controllers/fleet/FleetApplication'
import { VehicleApplication } from '@app/controllers/vehicle/VehicleApplication'

export const applicationContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<UserApplication>(TYPES.UserApplication).to(UserApplication)
    bind<FleetApplication>(TYPES.FleetApplication).to(FleetApplication)
    bind<VehicleApplication>(TYPES.VehicleApplication).to(VehicleApplication)
  }
)
