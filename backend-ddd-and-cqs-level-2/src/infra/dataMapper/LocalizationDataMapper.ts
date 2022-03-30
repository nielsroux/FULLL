import { injectable } from 'inversify'
import { IDataMapper } from '@core/IDataMapper'
import { Localization } from '@domain/localization/Localization'

@injectable()
export class LocalizationDataMapper implements IDataMapper<Localization> {
  toDomain(localization: any) {
    const { latitude, longitude } = localization
    return Localization.create({ latitude, longitude })
  }

  toDalEntity(localizationEntity: Localization) {
    return {
      latitude: localizationEntity.coordinates.latitude,
      longitude: localizationEntity.coordinates.latitude,
    }
  }
}
