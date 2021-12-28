import { sendMail } from '../utils'

export const show = async (req, res) => {
    const { user } = req;

    const model = await user.$fetchGraph('profile')

    return res.status(201).json(model)
}

export const update = async (req, res) => {
    const { user } = req

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

    let userData = {
        names: rest.names,
        email: rest.email
    }

    if (req.file) {
        userData.picture = req.file.path;
    }

    await user.$query().patch(userData);

    if (typeof profile == 'object') {
        let user_profile = await user.$relatedQuery('profile');
        user_profile === undefined ? await user.$relatedQuery('profile').insert(profile) : await user.$relatedQuery('profile').update(profile)
    }

    return res.status(201).json({ data: await user.$fetchGraph('profile') })
}
