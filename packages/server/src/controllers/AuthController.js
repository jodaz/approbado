import { sendCode, verifyCode } from '../config';
import jwt from 'jsonwebtoken'
import { SECRET, SESSION_EXPIRE, MailTransporter } from '../config'
import bcrypt from 'bcrypt'
import { User, Profile } from '../models'
import { validateRequest } from '../utils'

export const login = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email, password } = req.body;

        const user = await User.query().findOne({
            email: email
        });

        const signedData = {
            id: user.id,
            picture: user.picture,
            names: user.names
        }

        const match = await bcrypt.compare(password, user.password)

        if (match) {
            const token = await jwt.sign(signedData, SECRET, { expiresIn: SESSION_EXPIRE });

            return res.json({
                success: true,
                token: token
            })
        } else {
            res.status(422).json({
                'errors': {
                    "password": "Contraseña incorrecta"
                }
            })
        }
    }
}

export const logout = async (req, res) => {
    await req.logout();

    return res.status(201).json({
        'success': true
    })
}

export const sendSMSCode = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { phone } = req.body;

        try {
            await sendCode(phone)

            return res.json({
                message: 'Hemos enviado un código de verificación.',
                phone: phone
            })
        } catch (err) {
            console.log(err)

            return res.status(500).json({
                message: 'Ha ocurrido un error en nuestro servidor'
            })
        }
    }
}

export const verifySMSCode = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { email, password, phone, code, names } = req.body;

            await verifyCode(phone, code)

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await User.query().insert({
                names: names,
                password: encryptedPassword,
                rol: 'USER',
                email: email,
                phone: phone
            })

            await Profile.query().insert({
                user_id: user.id
            })

            const data = {
                name: user.names
            };

            await MailTransporter.sendMail({
                to: user.email,
                subject: '¡Bienvenido a Approbado!',
                template: 'welcome',
                context: data
            })

            return res.status(201).json({
                message: 'Código aceptado',
                phone: phone
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Ha ocurrido un error en nuestro servidor'
            })
        }
    }
}
