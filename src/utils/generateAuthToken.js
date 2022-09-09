import { SECRET, SESSION_EXPIRE } from '../config'
import jwt from 'jsonwebtoken'

export const generateAuthToken = async (data) => {
    const signedData = {
        user: data.id,
        isAuth: true
    }

    return await jwt.sign(
        signedData,
        SECRET,
        {
            expiresIn: SESSION_EXPIRE
        });
}
