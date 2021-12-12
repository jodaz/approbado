import { User } from '../models/User'
import bcrypt from 'bcrypt'
import { MailTransporter } from '../config'
import { validateRequest, sendMail, paginatedQueryResponse, getRandomPass } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = User.query();

    if (filter) {

        if (filter.names) {
            query.where('names', 'ilike', `%${filter.names}%`)
        }
        if (filter.email) {
            query.where('email', 'ilike', `%${filter.email}%`)
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

    const model = await User.query().findById(id).withGraphFetched('profile')

    return res.status(201).json(model)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
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

export const update_mobile = async (req, res) => {
    const { id } = req.params
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
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const user = await User.query().findById(id);
    
    await user.$relatedQuery('memberships').delete()
    await user.$relatedQuery('profile').delete()
    await user.$relatedQuery('authProviders').delete()
    //await user.$relatedQuery('blacklisted').delete()
    await user.$relatedQuery('messages').delete()
   // await user.$relatedQuery('reports').delete()
    await user.$relatedQuery('posts').delete()
    await user.$relatedQuery('schedules').delete()
    await user.$relatedQuery('payments').delete()
    
    await User.query().findById(id).delete();
    
    return res.json({data : "Cuenta Eliminada"});
}
