import { sendMail } from '../utils'
import isEmpty from 'is-empty'

export const show = async (req, res) => {
    const { user } = req;

    const profile = await user.$fetchGraph('profile')

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

    const { profile, ...rest } = req.body;

    await user.$query().patch({
        names: rest.names,
        email: rest.email
    });

    if (typeof profile == 'object') {
        let user_profile = await user.$relatedQuery('profile');
        user_profile === undefined ? await user.$relatedQuery('profile').insert(profile) : await user.$relatedQuery('profile').update(profile) 
    }

    return res.status(201).json({ data: await user.$fetchGraph('profile') })
}
