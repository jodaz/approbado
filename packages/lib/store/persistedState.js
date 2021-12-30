import jwtDecode from 'jwt-decode';

export const loadState = () => {
    try {
        const token = localStorage.getItem('user');

        if (!token) {
            return undefined
        }

        const user = jwtDecode(token);

        return {
            user: {
                token: token,
                ...user
            }
        }
    } catch (err) {
        return undefined
    }
}
