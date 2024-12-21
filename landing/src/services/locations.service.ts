import type { BaseResponseType, CommonReq, PagingReq } from '@/types/common'
import type { LocationType } from '@/types/locations'

import { ServerAxios } from '@/helper/fetcher'

const locationApi = {
  getAllProvinces: (params: PagingReq & CommonReq): Promise<BaseResponseType<LocationType>> => {
    return ServerAxios.get('/locations/provinces/all', {
      params,
      isDisableToast: true,
    })
  },
  getAllDistricts: (params: PagingReq & CommonReq): Promise<BaseResponseType<LocationType>> => {
    return ServerAxios.get('/locations/districts/all', {
      params,
      isDisableToast: true,
    })
  },
  getAllWards: (params: PagingReq & CommonReq): Promise<BaseResponseType<LocationType>> => {
    return ServerAxios.get('/locations/districts/all', {
      params,
      isDisableToast: true,
    })
  },
}
export default locationApi
