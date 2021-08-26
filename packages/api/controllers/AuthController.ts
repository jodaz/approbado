import { Request, Response } from 'express'
import { sendCode, verifyCode } from '../config';
import bcrypt from 'bcrypt'
import User from '../models/User'

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
    const { email, password, phoneNumber, code, names } = req.body;

    try {
        await verifyCode(phoneNumber, code)

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.query().insert({
            names: names,
            password: encryptedPassword,
            rol: 'USER',
            email: email,
            phone: phoneNumber
        })

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
