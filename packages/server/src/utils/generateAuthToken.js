import { SECRET, SESSION_EXPIRE } from '../config'
import jwt from 'jsonwebtoken'

export const generateAuthToken = async (user) => {
    const signedData = {
        id: user.id,
        picture: user.picture,
        names: user.names
    }

    return await jwt.sign(
        signedData,
        SECRET,
        {
            expiresIn: SESSION_EXPIRE
        });
}
