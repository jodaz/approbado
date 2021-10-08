import jwt from 'jsonwebtoken'
import { SECRET, SESSION_EXPIRE, MailTransporter } from '../config'
import bcrypt from 'bcrypt'
import { User, PasswordReset } from '../models'
import { validateRequest } from '../utils'

export const resetPassword = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email } = req.body;

        const user = await User.query().findOne({
            email: email
        });

        if (!user) {
            res.status(422).json({
                'errors': {
                    "email": "Usuario no encontrado"
                }
            })
        } else {
            const token = await jwt.sign(
                { id: user.id },
                SECRET,
                { expiresIn: SESSION_EXPIRE }
            );

            await PasswordReset.insert({
                token: token,
                user_id: user.id
            })

            return res.json({
                success: true
            })
        }
    }
}

export const updatePassword = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await PasswordReset.quey().findOne({ token: req.query.token });

        if (!model) {
            return res.status(404).json({
                'success': false,
                'error': 'tokennotfound'
            });
        } else {
            const { password } = req.body;
            const encryptedPassword = await bcrypt.hash(password, 10);

            // const user = await User.query().insert({ password: encryptedPassword })

            await MailTransporter.sendMail({
                to: user.email,
                subject: '¡Su contraseña ha sido actualizada!'
            })
        }
    }
}
