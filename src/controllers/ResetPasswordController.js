import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { User, PasswordReset } from '../models'
import { validateRequest, sendMail, makeToken } from '../utils'
import bcrypt from 'bcrypt'

export const resetPassword = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { origin } = req.headers;
        const { email } = req.body;

        const user = await User.query().findOne({
            email: email
        });

        const token = await jwt.sign(
            { id: user.id },
            SECRET,
            { expiresIn: 86400 }
        );

        const mailerData = {
            message: {
                to: user.email,
            },
            template: 'resetPassword',
            subject: 'Cambiar contraseña',
            locals: {
                name: user.names,
                url: `${origin}/update-password/?token=${token}`
            }
        };

        await sendMail(mailerData, res)

        await user.$relatedQuery('password_resets').insert({
            token: token
        })

        return res.json({
            success: true
        })
    }
}

export const verifyToken = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        return res.status(201).json({
            success: true
        })
    }
}

export const updatePassword = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const model = await PasswordReset.query().findOne({ token: req.query.token });

        const { password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Obtener usuario de model y actualizar contraseña
        const user = await model.$relatedQuery('user')
        await user.$query().patch({ password: encryptedPassword })

        try {
            const mailerData = {
                message: {
                    to: user.email,
                },
                template: 'updatePassword',
                subject: '¡Su contraseña ha sido actualizada!',
                locals: {
                    name: user.names
                }
            };

            await sendMail(mailerData, res)
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'lossconnection.'
            })
        }

        await model.$query().delete();

        return res.status(201).json({
            success: true
        })
    }
}

export const resetPasswordMobile = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const user  = await User.query().where('email',req.body.email).first()

        const token = await makeToken(6)

        await PasswordReset.query().insert({user_id : user.id,token : token})
        // Send email
        const mailerData = {
            message: {
                to: user.email,
            },
            template: 'updateMobilePassword',
            subject: 'Cambio de contraseña',
            locals: {
                name: user.names,
                token: token,
            }
        };

        await sendMail(mailerData, res)

        return res.status(200).json({
            data: {
                id: user.id,
                success: true
            }
        })
    }
}
