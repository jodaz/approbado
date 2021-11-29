import nodemailer from 'nodemailer'
import previewEmail from 'preview-email'
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

const PreviewEmail = async (data) => (
    await previewEmail(data, {
        template: path.resolve('./src/resources/mail/layouts'),
    })
)

MailTransporter.verify(function (error, success) {
    if (error) {
        console.log("GOT AN ERROR! IN MAIL TRANSPORTER")
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

MailTransporter.use("compile", hbs(options))

export { MailTransporter, PreviewEmail }
