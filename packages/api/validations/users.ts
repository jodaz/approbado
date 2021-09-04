import { CustomValidator } from 'express-validator';
import User from '../models/User'

export const emailExists: CustomValidator = async value => {
    const user = await User.query().findOne({
        email: value
    });

    if (user) {
        throw new Error("Este correo ha sido registrado.")
    }

    return true
}
