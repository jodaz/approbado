import * as dotenv from 'dotenv'

dotenv.config()

export const APP_ENV = process.env.APP_ENV || 'development'

export const APP_PORT = process.env.APP_PORT || 4000

export const USER = {
  name: process.env.NAME,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
}

export const DB = {
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

export const TWILIO = {
  api_key: process.env.TWILIO_API_KEY,
  api_secret: process.env.TWILIO_API_SECRET,
  sid: process.env.TWILIO_ACCOUNT_SID
}

export const SECRET = process.env.PASSPORT_SECRET
