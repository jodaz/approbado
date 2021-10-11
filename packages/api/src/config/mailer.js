import nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";
import { MAIL } from './env'
import path from 'path'

const options = {
    viewEngine: {
        layoutsDir: path.resolve('./src/resources/mail/layouts'),
        extname: ".html"
    },
    extName: ".html",
    viewPath: path.resolve('./src/resources/mail')
};

const MailTransporter = nodemailer.createTransport({
    host: MAIL.MAIL_HOST,
    port: MAIL.MAIL_PORT,
    secure: MAIL.IS_SECURE,
    auth: {
        user: MAIL.MAIL_USERNAME,
        pass: MAIL.MAIL_PASSWORD
    },
});

MailTransporter.use("compile", hbs(options))

export { MailTransporter }
