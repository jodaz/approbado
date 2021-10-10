import jwt from 'jsonwebtoken'
import { SECRET, SESSION_EXPIRE, APP_DOMAIN, MailTransporter } from '../config'
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

        const token = await jwt.sign(
            { id: user.id },
            SECRET,
            { expiresIn: SESSION_EXPIRE }
        );

        await PasswordReset.query().insert({
            token: token,
            user_id: user.id
        })

        const data = {
            name: user.names,
            url: `${APP_DOMAIN}/reset-password/${token}`
        };

        await MailTransporter.sendMail({
            to: user.email,
            subject: 'Reestablecer contraseña',
            template: 'resetPassword',
            context: data
        })

        return res.json({
            success: true
        })
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
