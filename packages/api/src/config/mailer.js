import nodemailer from 'nodemailer'
import { MAIL } from './env'

export const MailTransporter = nodemailer.createTransport({
    host: MAIL.MAIL_HOST,
    port: MAIL.MAIL_PORT,
    secure: MAIL.IS_SECURE,
    auth: {
        user: MAIL.MAIL_USERNAME,
        pass: MAIL.MAIL_PASSWORD
    },
});
