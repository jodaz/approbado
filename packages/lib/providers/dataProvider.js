import apiClient from '@jodaz_/data-provider';
import CONFIG_NAMES from '../configs'

export const dataProvider = apiClient(`${process.env.REACT_APP_API_DOMAIN}`, {
  offsetPageNum: -1,
}, `${CONFIG_NAMES.AUTH_TOKEN}`);

const defaultDataProvider = {
    create: () => Promise.resolve({ data: { id: 0 } }),
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({}),
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    getOne: () => Promise.resolve({ data: {} }),
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({}),
};
