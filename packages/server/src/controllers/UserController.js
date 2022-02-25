import { User } from '../models/User'
import bcrypt from 'bcrypt'
import {
    validateRequest,
    sendMail,
    paginatedQueryResponse,
    getRandomPass
} from '../utils'
import pug from 'pug'
import path from 'path'
import pdf from 'html-pdf'

export const index = async (req, res) => {
    const { filter, sort, order } = req.query

    try {
        const query = User.query();

        if (filter) {
            if (filter.global_search) {
                query.where('names', 'ilike', `%${filter.global_search}%`)
            }
            if (filter.email) {
                query.where('email', 'ilike', `%${filter.email}%`)
            }
            if (filter.user_name) {
                query.where('user_name', 'ilike', `%${filter.user_name}%`)
            }
            if (filter.is_registered) {
                query.where('is_registered', filter.is_registered)
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
            if (filter.gt_date) {
                query.where('created_at', '>=', `%${filter.gt_date}%`)
            }
            if (filter.lt_date) {
                query.where('created_at', '<', `%${filter.lt_date}%`)
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

export const download = async (req, res) => {
    try {
        const query = await User.query()

        const compiledFunction = pug.compileFile(
            path.resolve(__dirname, '../resources/pdf/reports/users.pug')
        );

        const compiledContent = compiledFunction({
            records: query,
            title: 'Reporte de usuarios'
        });

        const pdfFilePath = path.resolve(__dirname, '../../public/reports/users.pdf');

        await pdf.create(compiledContent).toFile(pdfFilePath, async (error, res) => {
            if (error) return console.log(error)
        });

        res.download(pdfFilePath)
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
                    message: {
                        to: email,
                    },
                    template: 'welcomeAdmin',
                    subject: '¡Bienvendo a Approbado!',
                    locals: {
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
            const mailerData = {
                message: {
                    to: email,
                },
                template: 'welcomeAdmin',
                subject: 'Aviso: contraseña actualizada',
                locals: {
                    text: `Su nueva contraseña es ${newPassword}`
                }
            };

            await sendMail(mailerData, res)
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
