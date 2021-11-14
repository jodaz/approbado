import jwtDecode from 'jwt-decode';
import CONFIG_NAMES from '../configs'

export const authProvider = (packageName) => ({
    login: async (data) => {
        await localStorage.setItem(CONFIG_NAMES.AUTH_TOKEN, data);

        return Promise.resolve();
    },
    logout: async () => {
        await localStorage.removeItem(CONFIG_NAMES.AUTH_TOKEN);

        if (packageName == 'app') {
            return Promise.resolve();
            return Promise.resolve(window.location.assign(`${CONFIG_NAMES.REDIRECT_TO}`));
        } else {
            return Promise.resolve();
        }
    },
    checkError: async (error) => {
        const { response } = error;

        if (response.status === 401 || response.status === 403) {
            await localStorage.removeItem(CONFIG_NAMES.AUTH_TOKEN);
            await localStorage.removeItem(CONFIG_NAMES.PERMISSIONS);
        }

        return Promise.resolve();
    },
    checkAuth: async () => {
        const token = await localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

        if (!token) {
            return (packageName == 'app')
                ? window.location.href = `${CONFIG_NAMES.REDIRECT_TO}`
                : Promise.reject({ redirectTo: '/login' })
        }

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
