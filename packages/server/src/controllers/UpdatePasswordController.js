import bcrypt from 'bcrypt'
import { validateRequest, sendMail } from '../utils'

export const update = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { user } = req

        // Send email
        const mailerData = {
            email: user.email,
            template: 'updatePassword',
            subject: 'Su contraseña ha sido actualizada',
            context: {
                name: user.names
            }
        };

        await sendMail(mailerData, res)

        const { new_password } = req.body
        const encryptedPassword = await bcrypt.hash(new_password, 10);

        await user.$query()
            .update({ password: encryptedPassword })

        return res.status(201).json({
            data: {
                id: user.id,
                success: true
            }
        })
    }
}
