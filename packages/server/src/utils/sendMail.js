import { EmailTemplate } from '../config'

export const sendMail = async (data, res) => {
    try {
        await EmailTemplate.send(data)
    } catch (err) {
        console.log(err)
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
