import { Twilio } from "twilio";
import { TWILIO_CREDS } from './env'

const client = new Twilio(TWILIO_CREDS.sid, TWILIO_CREDS.auth_token)

export const sendCode = async (phone) => {
    return await client.verify
        .services(TWILIO_CREDS.service_id)
            .verifications.create({
                to: `+${phone}`,
                channel: "sms",
                locale: 'es'
            })
            .then(data => data)
}

export const verifyCode = async (phone, code) => {
    return await client.verify
        .services(TWILIO_CREDS.service_id)
        .verificationChecks.create({
            to: `+${phone}`,
            code: code
        })
        .then(data => {
            if (data.status === 'approved') {
                return true;
            } else {
                return false;
            }
        })
}
