import { MailTransporter } from '../config'

export const sendMail = async (data, res) => {
    const {
        context,
        email,
        template,
        subject
    } = data

    try {
        await MailTransporter.sendMail({
            to: email,
            subject: subject,
            template: template,
            context: context
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'lossconnection.'
        })
    }
}
