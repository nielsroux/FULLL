import { MongoClientOptions, MongoClient, Db } from 'mongodb'
import config from '@config/main'

export const createMongodbConnection = async (
  host: string,
  options: MongoClientOptions = {}
): Promise<Db> => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(host, options, (error, client) => {
      if (error) reject(error)
      if (client === undefined)
        throw new Error('Db Not Found - MongoClient Error')
      resolve(client.db(config.DB_NAME))
    })
  })
}
