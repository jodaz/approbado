import jwtDecode from 'jwt-decode';
import CONFIG_NAMES from '../configs';

export const loadState = () => {
    try {
        const user = localStorage.getItem(CONFIG_NAMES.USER);
        const token = localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

        if (!token) {
            return undefined
        }

        let parsedData = JSON.parse(user)
        const decodedToken = jwtDecode(token)

        return {
            user: {
                token: token,
                isAuth: (token) ? true : false,
                exp: decodedToken.exp,
                user: parsedData,
            }
        }
    } catch (err) {
        return undefined
    }
}
