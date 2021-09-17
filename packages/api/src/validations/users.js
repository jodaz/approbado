import User from '../models/User'

export const emailExists = async value => {
    const user = await User.query().findOne({
        email: value
    });

    if (user) {
        throw new Error("Este correo ha sido registrado.")
    }

    return true
}

export const phoneExists = async value => {
    const user = await User.query().findOne({
        phone: value
    });

    if (user) {
        throw new Error("Este teléfono ha sido registrado.")
    }

    return true
}
