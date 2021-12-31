import { MailTransporter, APP_ENV } from '../config'

export const sendMail = async (data, res) => {
    if (APP_ENV === 'production') {
        try {
            await MailTransporter.sendMail(data)
        } catch (err) {
            console.log(err)
        }
    }
}
export const makeToken = async (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
