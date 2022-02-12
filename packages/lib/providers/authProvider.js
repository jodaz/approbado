import jwtDecode from 'jwt-decode';
import CONFIG_NAMES from '../configs'

export const authProvider = () => ({
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: async (error) => {
        const { response } = error;

        // if (response.status === 401 || response.status === 403) {
        //     await localStorage.removeItem(CONFIG_NAMES.AUTH_TOKEN);
        // }

        return Promise.resolve();
    },
    checkAuth: async (packageName) => {
        const token = await localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

        // if (!token) {
        //     return (packageName == 'app')
        //         ? window.location.href = `${CONFIG_NAMES.REDIRECT_TO}`
        //         : Promise.reject({ redirectTo: '/login' })
        // }

        return Promise.resolve()
    },
    getPermissions: async () => {
        const permissions = await localStorage.getItem(CONFIG_NAMES.PERMISSIONS);

        return permissions ? Promise.resolve(permissions) : Promise.resolve('guest');
    },
    getIdentity: async () => {
        const token = await localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

        if (token) {
            const { exp, iat, ...rest } = jwtDecode(token);
            return Promise.resolve(rest);
        }

        return Promise.reject()
    }
});
