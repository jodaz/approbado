import jwtDecode from 'jwt-decode';
import CONFIG_NAMES from '../configs'
console.log(CONFIG_NAMES)
export const authProvider = () => ({
    login: async (data) => {
        await localStorage.setItem(CONFIG_NAMES.AUTH_TOKEN, data.token);
        await localStorage.setItem(CONFIG_NAMES.USER, JSON.stringify(data.user));

        return Promise.resolve();
    },
    logout: async (packageName) => {
        console.log('logout');
        await localStorage.removeItem(CONFIG_NAMES.AUTH_TOKEN);

        if (packageName == 'app') {
            return Promise.resolve(window.location.assign(`${CONFIG_NAMES.REDIRECT_TO}`));
        } else {
            return Promise.resolve();
        }
    },
    checkError: async (error) => {
        const { response } = error;

        if (response.status === 401 || response.status === 403) {
            await localStorage.removeItem(CONFIG_NAMES.AUTH_TOKEN);
        }

        return Promise.resolve();
    },
    checkAuth: async (packageName) => {
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
