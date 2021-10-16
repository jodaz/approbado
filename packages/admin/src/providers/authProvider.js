import jwtDecode from 'jwt-decode';
import CONFIG_NAMES from '../configs'

export const authProvider = {
    login: async (data) => {
        await localStorage.setItem(CONFIG_NAMES.AUTH_TOKEN, data);

        return Promise.resolve();
    },
    logout: async () => {
        return Promise.resolve();
    },
    checkError: async (error) => {
        console.log("Check Error")
        const { response } = error;

        if (response.status === 401 || response.status === 403) {
            await localStorage.removeItem(CONFIG_NAMES.AUTH_TOKEN);
            await localStorage.removeItem(CONFIG_NAMES.IDENTIFICATION);
            await localStorage.removeItem(CONFIG_NAMES.PERMISSIONS);
        }

        return Promise.resolve();
    },
    checkAuth: async () => {
        const token = await localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

        if (!token) {

            return Promise.resolve()
            return window.location.href = `${CONFIG_NAMES.REDIRECT_TO}`
        } else {
            console.log(jwtDecode(token))
        }

        return Promise.resolve()
    },
    getPermissions: async () => {
        // const permissions = await localStorage.getItem(CONFIG_NAMES.PERMISSIONS);

        // return permissions ? Promise.resolve(permissions) : Promise.resolve('guest');
        return Promise.resolve()
    },
    getIdentity: async () => {
        // const token = await localStorage.getItem(CONFIG_NAMES.IDENTIFICATION);

        // if (token) {
        //   const { id, full_name, picture, ...rest } = JSON.parse(token);

        //   return ({
        //     id: id,
        //     full_name: full_name,
        //     avatar: picture,
        //     ...rest
        //   });
        // }
        return Promise.resolve()
    }
};
