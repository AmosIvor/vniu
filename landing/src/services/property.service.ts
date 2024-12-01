import type { BaseResponseType, CommonReq, PagingReq } from '@/types/common'
import type {
  PropertyDocumentsType,
  PropertyFinancialBreakdownType,
  PropertyInformationType,
  PropertyReturnsType,
  PropertyTypes,
  PublishedPropertyType,
} from '@/types/property'

import { ServerAxios } from '@/helper/fetcher'

const propertyApi = {
  getAll: (params: PagingReq): Promise<BaseResponseType<PropertyTypes>> => {
    return ServerAxios.get('/properties/all', {
      params,
      isDisableToast: true,
    })
  },
  getDetail: (propertyId: string): Promise<PropertyTypes> => {
    return ServerAxios.get(`/properties/${propertyId}`, {
      isDisableToast: true,
    })
  },
  create: (payload: PropertyInformationType): Promise<PropertyTypes> => {
    return ServerAxios.post('/properties/create-property', payload)
  },
  updateInformation: (payload: PropertyInformationType & CommonReq) => {
    return ServerAxios.post('/properties/update-information-property', payload)
  },
  updateReturns: (payload: PropertyReturnsType & CommonReq) => {
    return ServerAxios.post('/properties/update-returns-property', payload)
  },
  updateFinancialBreakdown: (payload: PropertyFinancialBreakdownType & CommonReq) => {
    return ServerAxios.post('/properties/update-financial-breakdown-property', payload)
  },
  updateDocument: (payload: PropertyDocumentsType & CommonReq) => {
    return ServerAxios.post('/properties/update-document-property', payload)
  },
  published: (payload: PublishedPropertyType & CommonReq) => {
    const { propertyId: id } = payload
    return ServerAxios.post('/properties/publish-property', {
      ...payload,
      id,
    })
  },
}

export default propertyApi
