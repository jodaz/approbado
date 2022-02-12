import { sendCode, verifyCode } from '../config';
import bcrypt from 'bcrypt'
import { User } from '../models'
import { validateRequest } from '../utils'
import { generateAuthToken, sendMail, getAuthenticatedUser } from '../utils';

const loginAuthFlow = async (field, email, password) => {
    const user = await User.query().findOne(
        Object.assign({}, { [field]: email })
    )

    if(!user) {
        return {
            'errors': {
                "user": "Usuario no encontrado"
            },
            status: 422
        }
    }

    const match = await bcrypt.compare(password, user.password ?? '' )

    if (match) {
        const token = await generateAuthToken(user);
        const data = await getAuthenticatedUser(user);

        return {
            token: token,
            user : data,
            status: 200
        }
    } else {
        return {
            'errors': {
                "password": "Contraseña incorrecta"
            },
            status: 422
        }
    }
}

/**
 * Login para usuarios (web/movil)
 * { username, password }
 */
export const login = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email, password } = req.body;

        const { status, ...rest } = await loginAuthFlow('user_name', email, password)

        return res.status(status).json(rest)
    }
}

/**
 * Login para usuarios admin
 * { email, password }
 */
export const adminLogin = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email, password } = req.body;

        const { status, ...rest } = await loginAuthFlow('email', email, password)

        return res.status(status).json(rest)
    }
}

export const externalLogin = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email, key, provider } = req.body

        const user = await User.query()
            .findOne({
                'email': email
            })

        const authProviderKey = await user.$relatedQuery('authProviders')
            .findOne({
                provider_type: provider,
                provider_key: key
            })

        if (!authProviderKey) {
            // Save social media profile (auth provider)
            await user.$relatedQuery('authProviders')
                .insert({
                    provider_type: provider,
                    provider_key: key
                })
        }

        const token = await generateAuthToken(user);

        return res.json({
            success: true,
            token: token,
            user : user
        })
    }
}

export const externalMobileLogin = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email, names, key, provider } = req.body

        let user = await User.query()
            .findOne({
                'email': email
            })

        if(!user){
            user = await User.query().insert({
                names: names,
                rol: 'USER',
                email: email,
                user_name : email.split('@')[0],
                picture : 'default/user.png'
            })

            const payment = await user.$relatedQuery('payments').insert({
                payment_method: 'none',
                amount: 0,
                plan_id : 1,
                user_id : user.id
            })

            await user.$relatedQuery('memberships').insert({
                plan_id: 1,
                user_id: user.id,
                payment_id : payment.id,
                active : true
            })

        }

        const authProviderKey = await user.$relatedQuery('authProviders')
            .findOne({
                provider_type: provider,
                provider_key: key
            })

        if (!authProviderKey) {
            // Save social media profile (auth provider)
            await user.$relatedQuery('authProviders')
                .insert({
                    provider_type: provider,
                    provider_key: key
                })
        }

        const token = await generateAuthToken(user);

        return res.json({
            success: true,
            token: token,
            user : user
        })
    }
}

export const logout = async (req, res) => {
    await req.logout();

    return res.status(201).json({
        'success': true
    })
}

export const sendSMSCode = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { phone } = req.body;

        try {
            await sendCode(phone)

            return res.json({
                success: true,
                message: 'Hemos enviado un código de verificación.'
            })
        } catch (err) {
            console.log(err)

            return res.status(500).json({
                message: 'Ha ocurrido un error en nuestro servidor'
            })
        }
    }
}

export const verifySMSCode = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        try {
            const {
                email,
                user_name,
                password,
                phone,
                code,
                names,
                last_name,
                key,
                provider,
                external
            } = req.body;

            await verifyCode(phone, code)

            const encryptedPassword = await bcrypt.hash(password, 10);

            const mailerData = {
                to: email,
                subject: '¡Bienvenido a Approbado!',
                template: 'welcome',
                context: {
                    name: names,
                }
            };

            await sendMail(mailerData, res)

            // Save user data and profiles
            const user = await User.query().insert({
                names: names,
                last_name: last_name,
                user_name: user_name,
                password: encryptedPassword,
                rol: 'USER',
                email: email,
                phone: phone,
                picture : 'public/default/user.png',
                user_name : email.split('@')[0],
            })

            await user.$relatedQuery('profile').insert({
                names: names,
                user_id: user.id
            })

            const payment = await user.$relatedQuery('payments').insert({
                payment_method: 'none',
                amount: 0,
                plan_id : 1,
                user_id : user.id
            })

            await user.$relatedQuery('memberships').insert({
                plan_id: 1,
                user_id: user.id,
                payment_id : payment.id,
                active : true
            })

            if (external) {
                // Save social media profile (auth provider)
                await user.$relatedQuery('authProviders')
                    .insert({
                        provider_type: provider,
                        provider_key: key
                    })
            }

            const token = await generateAuthToken(user);

            return res.status(201).json({
                message: 'Código aceptado',
                token: token,
                user : user
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: 'Ha ocurrido un error en nuestro servidor'
            })
        }
    }
}

export const deleteAccount = async (req, res) => {
    const { user } = req

    const mailerData = {
        to: user.email,
        subject: '¡Adiós!',
        template: 'welcome',
        context: {
            name: user.names,
        }
    };

    await sendMail(mailerData, res)

    await user.$query().delete();

    return res.status(201).json({
        data: {
            success: true
        }
    })
}
