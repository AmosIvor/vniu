import { STORAGE_KEY } from '@/enums/localStorage'
import { setLoading } from '@/store/common-store'
import axios from 'axios'
import { toast } from '@/components/ui/toast'

const createAxiosInstance = (baseURL: string, includeCredentials = false) => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL,
    withCredentials: includeCredentials,
  })

  instance.interceptors.request.use(
    (request) => {
      const { isDisableLoading } = request
      const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)

      setLoading(!isDisableLoading)

      if (accessToken) {
        if (request.headers) {
          request.headers.Authorization = `Bearer ${accessToken}`
        }
      }

      return request
    },
    (error) => Promise.reject(error),
  )
  instance.interceptors.response.use(
    (response) => {
      const { isDisableLoading, isDisableToast } = response.config
      if (!isDisableLoading) {
        setLoading(false)
      }
      if (!isDisableToast && typeof window !== 'undefined') {
        toast.success(response.data?.message || 'Successfully')
      }

      return response.data ?? response
    },
    (error) => {
      const { response } = error
      setLoading(false)
      if (typeof window !== 'undefined') {
        toast.error(response?.data?.message || 'Something went wrong')
      }

      // if (response?.status === 401) {
      //    storage.clearAllStorage()
      //   window.location.href = '/login'
      // }
      // if (response?.status === 403) {
      //   window.location.href = '/not-found'
      // }

      return Promise.reject(error)
    },
  )

  return instance
}

// Axios instances
export const ClientAxios = createAxiosInstance(`${process.env.NEXT_PUBLIC_API_DOMAIN}`, true)
export const ServerAxios = createAxiosInstance(
  `${process.env.SERVER_NEXT_PUBLIC_API_DOMAIN || process.env.NEXT_PUBLIC_API_DOMAIN}`,
)

// Fetcher function
export const fetcher = async (reqUrl: string, { headers = {}, ...options }) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}${reqUrl}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  })
}
