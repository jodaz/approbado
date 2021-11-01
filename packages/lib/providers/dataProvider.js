import apiClient from 'ra-laravel-client';
import CONFIG_NAMES from '../configs'

const formDataHandler = (data) => {
    const formData = new FormData();
    const { file, ...rest } = data;
    formData.append('file', file.rawFile);

    for (let [key, value] of Object.entries(rest)) {
        formData.append(key, value);
    };

    return formData;
}

const defaultDataProvider = apiClient(`${process.env.REACT_APP_API_DOMAIN}`, {
  offsetPageNum: -1,
}, `${CONFIG_NAMES.AUTH_TOKEN}`);

export const dataProvider = {
    ...defaultDataProvider,
    create: (resource, params) => {
        if (!params.data.file) {
            return defaultDataProvider.create(resource, params);
        }

        return defaultDataProvider.create(resource, {
            data: formDataHandler(params.data)
        });
    },
    update: (resource, params) => {
        if (!params.data.file) {
            return defaultDataProvider.update(resource, params);
        }

        return defaultDataProvider.update(resource, {
            id: params.id,
            data: formDataHandler(params.data)
        });
    }
}
