import { fileProvider as defaultFileProvider } from '@jodaz_/file-provider'
import CONFIG_NAMES from '../configs'

export const fileProvider = defaultFileProvider({
    apiUrl: `${process.env.REACT_APP_API_DOMAIN}`,
    tokenName: `${CONFIG_NAMES.AUTH_TOKEN}`
})
