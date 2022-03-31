import * as dotenv from 'dotenv'
dotenv.config()

export default {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  DB_NAME: process.env.DB_NAME || 'fleetsmanagement',
}
