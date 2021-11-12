import { User } from '../models/User'
import bcrypt from 'bcrypt'
import { MailTransporter } from '../config'
import { validateRequest, sendMail, paginatedQueryResponse, getRandomPass } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = User.query();

    if (filter) {
        if (filter.names) {
            query.where('names', filter.names)
        }
        if (filter.is_registered) {
            query.where('is_registered', filter.is_registered)
        }
        if (filter.top) {
            query
                .withGraphFetched('profile')
                .modifiers({
                    filterTop: query => query.modify('orderByPoints', 'desc')
                })
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await User.query().findById(id)

    return res.status(201).json(model)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { random_pass, password, ...rest } = req.body;

        let newPassword = random_pass ? getRandomPass() : password;
        const encryptedPassword = await bcrypt.hash(newPassword, 10)

        const model = await User.query().insert({
            ...rest,
            password: encryptedPassword,
            is_registered: false
        })

        if (random_pass) {
            // Send email
            const mailerData = {
                to: model.email,
                template: 'welcomeAdmin',
                subject: '¡Bienvendo a Approbado!',
                context: {
                    name: model.names,
                    password: newPassword
                }
            };

            sendMail(mailerData, res)
        }

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    const { random_pass, password, ...rest } = req.body;

    let newPassword = random_pass ? getRandomPass() : password;
    const encryptedPassword = await bcrypt.hash(newPassword, 10)

    const model = await User.query().updateAndFetchById(id, {
        ...rest,
        password: encryptedPassword
    })

    if (random_pass) {
        await MailTransporter.sendMail({
            to: BaseClass.email,
            subject: 'Aviso: contraseña actualizada',
            text: `Su nueva contraseña es ${newPassword}`
        })
    }

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const user = await User.query().findById(id).delete();

    return res.json(user);
}
