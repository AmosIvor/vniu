import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    isDisableLoading?: boolean
    isDisableToast?: boolean
  }
}
