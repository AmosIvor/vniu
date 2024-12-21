import axios from 'axios';

const config = {
  baseURL: `${process.env.NEXT_PUBLIC_SOCKET_URL}`,
  headers: {
    // Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const axiosClient = axios.create(config);
axiosClient.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      if (request.headers) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return request;
  },
  (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
  (response) => {
    return response.data ?? response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
