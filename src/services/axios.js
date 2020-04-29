import axios from 'axios';
import {apiURL} from '../config';

axios.defaults.baseURL = apiURL;

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default axios;
