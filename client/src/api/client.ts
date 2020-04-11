import axios from 'axios';

import { envVariableGetter } from '@/utils';
import { ErrorsStore } from '@/store';

const defaultConfig = {
  baseURL: envVariableGetter('VUE_APP_API_URL'),
  timeout: 60 * 1000,
};

export const client = axios.create(defaultConfig);

client.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    ErrorsStore.addError({
      raw: error.response,
      message: error.response.message || error.response.data || undefined
    });

    return Promise.reject(error.response)
  }
);
