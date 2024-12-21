import type { AuthType, LoginResType, LoginType, RegisterType, UserType } from '@/types/auth'
import type { CommonReq } from '@/types/common'

import { ServerAxios } from '@/helper/fetcher'

const authApi = {
  login: (payload: LoginType & CommonReq): Promise<LoginResType> => {
    return ServerAxios.post('/admins/login-with-email', payload)
  },
  register: (payload: RegisterType): Promise<AuthType> => {
    return ServerAxios.post('/admins/register', payload)
  },
}

export default authApi
