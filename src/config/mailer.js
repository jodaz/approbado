import nodemailer from 'nodemailer'
import { MAIL, APP_ENV } from './env'
import path from 'path'
import Email from 'email-templates'

const MailTransporter = new nodemailer.createTransport({
    host: MAIL.MAIL_HOST,
    port: MAIL.MAIL_PORT,
    secure: MAIL.IS_SECURE,
    auth: {
        user: MAIL.MAIL_USERNAME,
        pass: MAIL.MAIL_PASSWORD
    },
});

const EmailTemplate = new Email({
    message: {
        from: MAIL.MAIL_USERNAME
    },
    views: {
        root: path.resolve('./src/resources/emails/')
    },
    preview: {
        open: (APP_ENV == 'development') ? true : false
    },
    transport: MailTransporter,
    send: true
});

MailTransporter.verify(function (error, success) {
    if (error) {
        console.log("GOT AN ERROR! IN MAIL TRANSPORTER")
        console.log(error);
    } else {
        console.log("Server is ready to take our email messages");
    }
});

export { EmailTemplate }
