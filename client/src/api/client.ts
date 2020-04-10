import axios from 'axios';

import { envVariableGetter } from '@/utils';

const defaultConfig = {
  baseURL: envVariableGetter('VUE_APP_API_URL'),
  timeout: 60 * 1000,
};

export const client = axios.create(defaultConfig);
