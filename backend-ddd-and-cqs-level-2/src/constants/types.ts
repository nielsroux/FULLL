export const TYPES = {
  // Dependencies
  Db: Symbol('Db'),

  // Repositories
  UserRepository: Symbol('UserRepository'),
  FleetRepository: Symbol('FleetRepository'),
  VehicleRepository: Symbol('VehicleRepository'),
  LocalizationRepository: Symbol('LocalizationRepository'),

  // Data Mappers
  UserDataMapper: Symbol('UserDataMapper'),
  FleetDataMapper: Symbol('FleetDataMapper'),
  VehicleDataMapper: Symbol('VehicleDataMapper'),
  LocalizationDataMapper: Symbol('LocalizationDataMapper'),

  // Application Services
  UserApplication: Symbol('UserApplication'),
  FleetApplication: Symbol('FleetApplication'),
  VehicleApplication: Symbol('VehicleApplication'),
  LocalizationApplication: Symbol('LocalizationApplication'),
}
