import { AsyncContainerModule, interfaces } from 'inversify'
import config from '@config/main'
import { TYPES } from '@constants/types'
import { Db } from 'mongodb'
import { createMongodbConnection } from '@infra/db/mongodb'
import { IDataMapper } from '@core/IDataMapper'
import { User } from '@domain/user/User'
import { UserDataMapper } from '@infra/dataMapper/UserDataMapper'
import { IUserRepository } from '@domain/user/IUserRepository'
import { UserRepository } from '@infra/repositories/UserRepository'
import { Fleet } from '@domain/fleet/Fleet'
import { FleetDataMapper } from '@infra/dataMapper/FleetDataMapper'
import { IFleetRepository } from '@domain/fleet/IFleetRepository'
import { FleetRepository } from './repositories/FleetRepository'
import { Vehicle } from '@domain/vehicle/Vehicle'
import { VehicleDataMapper } from '@infra/dataMapper/VehicleDataMapper'
import { IVehicleRepository } from '@domain/vehicle/IVehicleRepository'
import { VehicleRepository } from './repositories/VehicleRepository'
import { Localization } from '@domain/localization/Localization'
import { LocalizationDataMapper } from '@infra/dataMapper/LocalizationDataMapper'
import { ILocalizationRepository } from '@domain/localization/ILocalizationRepository'
import { LocalizationRepository } from './repositories/LocalizationRepository'

export const infrastructureContainerModule = new AsyncContainerModule(
  async (bind: interfaces.Bind) => {
    const db: Db = await createMongodbConnection(config.MONGODB_URI)
    bind<Db>(TYPES.Db).toConstantValue(db)

    bind<IDataMapper<User>>(TYPES.UserDataMapper).to(UserDataMapper)
    bind<IDataMapper<Fleet>>(TYPES.FleetDataMapper).to(FleetDataMapper)
    bind<IDataMapper<Vehicle>>(TYPES.VehicleDataMapper).to(VehicleDataMapper)
    bind<IDataMapper<Localization>>(TYPES.LocalizationDataMapper).to(
      LocalizationDataMapper
    )

    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
    bind<IFleetRepository>(TYPES.FleetRepository).to(FleetRepository)
    bind<IVehicleRepository>(TYPES.VehicleRepository).to(VehicleRepository)
    bind<ILocalizationRepository>(TYPES.LocalizationRepository).to(
      LocalizationRepository
    )
  }
)
