import axios from 'axios';
import Qs from 'qs';

const axiosConfig = {
  headers: {
    Accept: 'application/json',
  },
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
};

const tokenDom = document.querySelector('meta[name=csrf-token]');
if (tokenDom) {
  const csrfToken = tokenDom.content;
  axiosConfig.headers['X-CSRF-Token'] = csrfToken;
  axiosConfig.headers['X-Requested-With'] = 'XMLHttpRequest';
}

const api = axios.create(axiosConfig);

export default api;
