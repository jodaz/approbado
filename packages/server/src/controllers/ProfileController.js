import { sendMail } from '../utils'

export const show = async (req, res) => {
    const { user } = req;

    const profile = await user.$relatedQuery('profile')

    return res.status(201).json({
        data: profile
    })
}

export const update = async (req, res) => {
    const { user, body } = req

    // Send email
    const mailerData = {
        to: user.email,
        template: 'accountChange',
        subject: 'Actualizó sus configuraciones de la cuenta',
        context: {
            name: user.names
        }
    };

    await sendMail(mailerData, res)

    await user.$relatedQuery('profile').update(body)

    return res.status(201).json({ data: body })
}
