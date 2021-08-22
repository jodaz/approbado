import * as dotenv from 'dotenv'

dotenv.config()

export const APP_ENV = process.env.APP_ENV

export const APP_PORT = process.env.APP_PORT

export const USER = {
  name: process.env.NAME,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
}

export const SECRET = process.env.PASSPORT_SECRET
