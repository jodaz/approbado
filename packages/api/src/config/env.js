import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export const APP_ENV = process.env.APP_ENV || 'development'

export const APP_PORT = process.env.APP_PORT || 4000

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:3000'

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

export const TWILIO_CREDS = {
  auth_token: process.env.TWILIO_AUTH_TOKEN || '',
  service_id: process.env.TWILIO_SERVICE_ID || '',
  sid: process.env.TWILIO_ACCOUNT_SID || ''
}

export const SECRET = process.env.PASSPORT_SECRET || 'SECRET_OR_KEY'
