import axios from 'axios';

const config = {
  baseURL: `http://localhost:5000`,
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
};

const axiosClient = axios.create(config);
axiosClient.interceptors.request.use(
  function (config) {
    console.log('request', `${config.url}`, config.data, config.params);
    // const curl = toCurl(config);
    // console.log('cURL:', curl);
    return config;
  },
  function (error) {
    console.error('Request errors', error);

    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    console.log('🚀 ~ response:', response);
    return response;
  },
  function (error) {
    console.log('🚀 ~ error:', error);
    // if (serverErrorStatuses.includes(error.response.status)) {
    //   // showToast('error', 'Connection Error. Please Try Again');
    // }
    return Promise.reject(error);
  }
);

export default axiosClient;
