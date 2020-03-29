import axios from 'axios';
import Storage from './storage';

let instance = axios.create({
  headers: {
    common: {
      // can be common or any other method
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  withCredentials: true
});

instance.interceptors.request.use(function (config) {
  if (Storage.get('jwt'))
    config.headers.common = {
      ...config.headers.common,
      Authorization: 'bearer ' + Storage.get('jwt')
    };
  return config;
});

instance.interceptors.response.use(function (config) {
  if (config.headers.jwt) Storage.setToken(config.headers.jwt);
  return config;
});

export default instance;
