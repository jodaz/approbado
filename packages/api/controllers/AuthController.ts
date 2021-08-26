import { Request, Response } from 'express'
import { sendCode, verifyCode } from '../config';

export const sendSMSCode = async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;

    try {
        await sendCode(phoneNumber)

        return res.json({
            message: 'Hemos enviado un código de verificación.',
            phoneNumber: phoneNumber
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            message: 'Ha ocurrido un error en nuestro servidor'
        })
    }
}

export const verifySMSCode = async (req: Request, res: Response) => {
    const { phoneNumber, code } = req.body;

    try {
        await verifyCode(phoneNumber, code)

        return res.json({
            message: 'Código aceptado',
            phoneNumber: phoneNumber
        })
    } catch (err) {
        console.log(err)

        return res.status(500).json({
            message: 'Ha ocurrido un error en nuestro servidor'
        })
    }
}
