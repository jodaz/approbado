import { sendCode, verifyCode } from '../config';
import bcrypt from 'bcrypt'
import { User } from '../models'
import { validateRequest } from '../utils'
import { generateAuthToken, sendMail } from '../utils';

export const login = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { email, password } = req.body;

        const user = await User.query().findOne({
            email: email
        });

        if(!user) {
            return res.status(422).json({
                'errors': {
                    "user": "Usuario no encontrado"
                }
            })
        }

        const match = await bcrypt.compare(password, user.password ?? '' )

        if (match) {
            const token = await generateAuthToken(user);

            return res.json({
                success: true,
                token: token,
                user : user
            })
        } else {
            return res.status(422).json({
                'errors': {
                    "password": "Contraseña incorrecta"
                }
            })
        }
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
                email: email
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
                password,
                phone,
                code,
                names,
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
                password: encryptedPassword,
                rol: 'USER',
                email: email,
                phone: phone
            })

            await user.$relatedQuery('profile').insert({
                names: names,
                user_id: user.id
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
            name: names,
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
