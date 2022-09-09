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
            message: {
                to: user.email,
            },
            template: 'accountChange',
            subject: 'Approbado | Actualización de perfil de usuario',
            locals: {
                name: user.names
            }
        };

        await sendMail(mailerData, res)

        let {
            profile,
            names,
            last_name,
            user_name,
            bio,
            email,
            phone
        } = req.body;

        let userData = {
            names: names,
            email: email,
            ...(last_name != 'null') && { last_name: last_name },
            ...(bio != 'null') && { bio: bio },
            ...(phone != 'null') && { phone: phone },
            ...(user_name != 'null') && { user_name: user_name },
        }

        if (req.file) {
            userData.picture = req.file.path;
        }

        await user.$query().patch(userData);

        if (typeof profile == 'string') {
            profile = JSON.parse(profile)
        }

        if (typeof profile == 'object') {
            let user_profile = await user.$relatedQuery('profile');
            user_profile === undefined
                ? await user.$relatedQuery('profile')
                    .insert(profile)
                : await user.$relatedQuery('profile')
                    .update(profile)
        }

        const model = await user.$fetchGraph('profile')

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
