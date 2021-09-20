import User from '../models/User'

export const updatePassword = {
    new_password: {
        custom: {
            options: value => {
                return value;
            }
        }
    }
};