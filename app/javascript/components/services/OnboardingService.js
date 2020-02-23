import Api from './api';

const registration = (params) => Api.post('/users', params);
const signIn = (params) => Api.post('/users/sign_in', params);

export default {
  registration,
  signIn,
};
