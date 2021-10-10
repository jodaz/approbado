import nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";
import { MAIL } from './env'

const options = {
    viewEngine: {
        partialsDir: __dirname + "/views/partials",
        layoutsDir: __dirname + "/views/layouts",
        extname: ".hbs"
    },
    extName: ".hbs",
    viewPath: "views"
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
