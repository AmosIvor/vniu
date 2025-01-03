import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      // baseURL: 'https://vniuapi20240429122410.azurewebsites.net/',
      baseURL: `http://10.0.2.2:5000/`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance
export default http
