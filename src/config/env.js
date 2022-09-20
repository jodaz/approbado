import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const APP_ENV = process.env.APP_ENV || 'development'

export const APP_DOMAIN = process.env.APP_DOMAIN || 'http://127.0.0.1';

export const APP_PORT = process.env.APP_PORT || 4000

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ?
    process.env.ALLOWED_ORIGINS.split(',')
    : 'http://localhost:3000'

export const SESSION_EXPIRE = process.env.SESSION_EXPIRE || 86400

export const USER = {
    names: process.env.NAME,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
}

export const MAIL = {
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_PORT: process.env.MAIL_PORT,
    IS_SECURE: process.env.IS_SECURE || false,
    MAIL_HOST: process.env.MAIL_HOST
}

export const FB_CREDS = {
    ID: process.env.FB_APP_ID || '',
    SECRET: process.env.FB_APP_SECRET || ''
}

export const FIREBASE_CREDS = {
    KEY: process.env.FIREBASE_KEY_AUTH || ''
}

export const DB = {
    name: process.env.DB_NAME,
    port: process.env.DB_PORT || '5432',
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
}

export const TWILIO_CREDS = {
    auth_token: process.env.TWILIO_AUTH_TOKEN || '',
    service_id: process.env.TWILIO_SERVICE_ID || '',
    sid: process.env.TWILIO_ACCOUNT_SID || ''
}

export const PUPPETEER_BROWSER_PATH = process.env.PUPPETEER_BROWSER_EXECUTABLE_PATH

export const SECRET = process.env.PASSPORT_SECRET || 'SECRET_OR_KEY'
