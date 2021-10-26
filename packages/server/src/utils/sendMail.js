import { MailTransporter, APP_ENV } from '../config'

export const sendMail = async (data, res) => {
    if (APP_ENV === 'production') {
        try {
            await MailTransporter.sendMail(data)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'lossconnection.'
            })
        }
    }
}
