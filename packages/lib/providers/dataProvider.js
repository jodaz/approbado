import apiClient from '@jodaz_/data-provider';
import CONFIG_NAMES from '../configs'

export const dataProvider = apiClient(`${process.env.REACT_APP_API_DOMAIN}`, {
  offsetPageNum: -1,
}, `${CONFIG_NAMES.AUTH_TOKEN}`);
