import { TYPES } from '@constants/types'
import { IDataMapper } from '@core/IDataMapper'
import { ILocalizationRepository } from '@domain/localization/ILocalizationRepository'
import { Localization } from '@domain/localization/Localization'
import { inject } from 'inversify'
import { Db } from 'mongodb'
import { Repository } from './Repository'

export class LocalizationRepository
  extends Repository<Localization>
  implements ILocalizationRepository
{
  constructor(
    @inject(TYPES.Db) private readonly db: Db,
    @inject(TYPES.LocalizationDataMapper)
    private readonly localizationDataMapper: IDataMapper<Localization>
  ) {
    super(db.collection('localizations'), localizationDataMapper)
  }
}
