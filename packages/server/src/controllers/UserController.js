import { User, Post } from '../models/User'
import bcrypt from 'bcrypt'
import { MailTransporter } from '../config'
import { validateRequest, sendMail, paginatedQueryResponse, getRandomPass } from '../utils'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = User.query();

        if (filter) {
            if (filter.global_search) {
                query.where('names', 'ilike', `%${filter.global_search}%`)
                    .orWhere('email', 'ilike', `%${filter.global_search}%`)
                    .orWhere('user_name', 'ilike', `%${filter.global_search}%`)
                    .orWhere('rol', 'ilike', `%${filter.global_search}%`)
            }
            if (filter.email) {
                query.orWhere('email', 'ilike', `%${filter.email}%`)
            }
            if (filter.user_name) {
                query.orWhere('user_name', 'ilike', `%${filter.user_name}%`)
            }
            if (filter.is_registered) {
                query.orWhere('is_registered', filter.is_registered)
                    .withGraphFetched('posts')
            }
            if (filter.in_blacklist) {
                query.whereExists(
                    User.relatedQuery('blacklisted').where('is_restricted', filter.in_blacklist)
                )
                .select([
                    'users.*',
                    User.relatedQuery('posts')
                        .join('reports', 'reports.post_id', '=', 'posts.id')
                        .join('users_reports', 'users_reports.report_id', 'reports.id')
                        .countDistinct('users_reports.id')
                        .as('usersReportsCount')
                ]);
            }
        }

        if (sort && order) {
            switch (sort) {
                case 'top':
                    query.modifiers({
                        filterTop: query => query.modify('orderByPoints', order)
                    })
                    break;
                case 'contributionsCount':
                    query.select(
                            User.ref('*'),
                            User.relatedQuery('posts').where('parent_id', null).count().as(sort)
                        )
                        .whereExists(User.relatedQuery('posts').where('parent_id', null))
                        .orderBy(sort, order);
                    break;
                default:
                    query.orderBy(sort, order);
                    break;
            }
        }

        return paginatedQueryResponse(query, req, res)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const show = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.query().findById(id)

        const profile = await user.$fetchGraph('profile');
        profile.posts = await user.$relatedQuery('posts');
        profile.discussion = await user.$relatedQuery('posts').whereRaw('parent_id is null');
        profile.comments = await user.$relatedQuery('posts').whereRaw('parent_id is not null');
        profile.awards = await user.$relatedQuery('awards').withGraphFetched('trivia');

        return res.status(201).json(user)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const { random_pass, password, names, email, ...rest } = req.body;

            let newPassword = random_pass ? getRandomPass() : password;
            const encryptedPassword = await bcrypt.hash(newPassword, 10)

            if (random_pass) {
                // Send email
                const mailerData = {
                    to: email,
                    template: 'welcomeAdmin',
                    subject: '¡Bienvendo a Approbado!',
                    context: {
                        name: names,
                        password: newPassword
                    }
                };

                sendMail(mailerData, res)
            }

            const model = await User.query().insert({
                ...rest,
                email: email,
                names: names,
                password: encryptedPassword,
                is_registered: false
            })

            return res.status(201).json(model)
        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: error })
        }
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    try {
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
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const update_mobile = async (req, res) => {
    const { id } = req.params
    try {
        const { current_password , new_password,...rest } = req.body;
        let filename;
        let data;

        if(req.file){
            filename = req.file.filename;
            data = {
                ...rest,
                picture : filename
            }
        }else{
            data = {
                ...rest,
            }
        }

        if (current_password) {
            const user = await User.query().findById(id)

            const match = await bcrypt.compare(current_password, user.password)

            if (match) {
                data = {
                    ...data,
                    password : await bcrypt.hash(new_password, 10)
                }
            }else{
                return res.status(422).json({
                    errors: { "current_password" : "Contraseña actual incorrecta"}
                })
            }
        }

        const model = await User.query().updateAndFetchById(id, {
            ...data,
        })

        return res.status(201).json(model)
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)

    try {
        const user = await User.query().findById(id);

        await user.$relatedQuery('memberships').delete()
        await user.$relatedQuery('profile').delete()
        await user.$relatedQuery('authProviders').delete()
        // await user.$relatedQuery('blacklisted').delete()
        await user.$relatedQuery('messages').delete()
        // await user.$relatedQuery('reports').delete()
        await user.$relatedQuery('posts').delete()
        await user.$relatedQuery('schedules').delete()
        await user.$relatedQuery('payments').delete()

        await User.query().findById(id).delete();

        return res.json({ data : "Cuenta Eliminada" });
    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: error })
    }
}
