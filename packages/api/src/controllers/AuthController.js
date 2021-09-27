import { sendCode, verifyCode } from '../config';
import jwt from 'jsonwebtoken'
import { SECRET, SESSION_EXPIRE } from '../config'
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

        if (!user) {
            res.status(422).json({
                'errors': {
                    "email": "Us2222uario no encontrado"
                }
            })
        } else {
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                const token = await jwt.sign(
                    { id: user.id },
                    SECRET,
                    { expiresIn: SESSION_EXPIRE }
                );

                return res.json({
                    success: true,
                    user: user,
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
}

export const logout = async (req, res) => {
    await req.logout();

    return res.status(201).json({
        'success': true
    })
}

export const sendSMSCode = async (req, res) => {
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

export const verifySMSCode = async (req, res) => {
    const { email, password, phoneNumber, code, names } = req.body;

    try {
        await verifyCode(phoneNumber, code)

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.query().insert({
            names: names,
            password: encryptedPassword,
            rol: 'USER',
            email: email,
            phone: phoneNumber
        })

        await Profile.query().insert({
            user_id: user.id
        })

        // Send an email notifying to the user its signup

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
