import { sendCode, verifyCode } from '../config';
import jwt from 'jsonwebtoken'
import { SECRET, SESSION_EXPIRE, MailTransporter } from '../config'
import bcrypt from 'bcrypt'
import { User, Profile } from '../models'
import { validateRequest } from '../utils'

export const resetPassword = async (req, res) => {
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

export const updatePassword = async (req, res) => {
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

            await MailTransporter.sendMail({
                to: user.email,
                subject: '¡Bienvendo a Approbado!'
            })

            return res.json({
                message: 'Código aceptado',
                phone: phone
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Ha ocurrido un error en nuestro servidor'
            })
        }
    }
}
