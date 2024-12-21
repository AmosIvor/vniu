// axiosConfig.js
import axios from 'axios'

import { ENV } from './env'
import { getStorageData } from '@utils/storage'

const token = getStorageData('app')?.state.auth.token || ''

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})

apiClient.interceptors.request.use(
  function (config) {
    console.log('request', `${ENV.API_URL}${config.url}`, config.data, config.params)
    // const curl = toCurl(config);
    // console.log('cURL:', curl);
    return config
  },
  function (error) {
    console.error('Request errors', error)

    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  function (response) {
    console.log('🚀 ~ response:', response)
    return response
  },
  function (error) {
    console.log('🚀 ~ error:', error)
    // if (serverErrorStatuses.includes(error.response.status)) {
    //   // showToast('error', 'Connection Error. Please Try Again');
    // }
    return Promise.reject(error)
  }
)

// const serverErrorStatuses = [502, 503, 404];

// const toCurl = (config: any) => {
//   const method = config.method.toUpperCase();
//   const url = config.url;
//   const headers = config.headers;
//   const data = config.data;

//   let curl = `curl -X ${method} '${url}'`;

//   Object.keys(headers).forEach(key => {
//     curl += ` -H '${key}: ${headers[key]}'`;
//   });

//   if (data) {
//     curl += ` -d '${JSON.stringify(data)}'`;
//   }

//   return curl;
// };
