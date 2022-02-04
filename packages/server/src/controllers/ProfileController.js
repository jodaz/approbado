import { sendMail, getAuthenticatedUser } from '../utils'

/**
 * Get user profile
 */
export const show = async (req, res) => {
    try {
        const data = await getAuthenticatedUser(req.user)

        return res.status(201).json(data)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const update = async (req, res) => {
    const { user } = req

    try {
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

        const model = await user.$fetchGraph('profile')

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
