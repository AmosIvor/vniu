'use client'

import type { BaseResponseType, CommonReq, PagingReq, QueryOptionType } from '@/types/common'
import type {
  PropertyDocumentsType,
  PropertyFinancialBreakdownType,
  PropertyInformationType,
  PropertyReturnsType,
  PropertyType,
  PropertyTypes,
  PublishedPropertyType,
} from '@/types/property'

import { DEFAULT_LIMIT } from '@/constants/pagination'
import { PROPERTY_QUERY } from '@/constants/property'
import propertyApi from '@/services/property.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProperty = (
  payload: PagingReq,
  options?: QueryOptionType<BaseResponseType<PropertyTypes>>,
) => {
  const { page = 1, limit = DEFAULT_LIMIT } = payload

  return useQuery({
    ...options,
    queryKey: [PROPERTY_QUERY.PROPERTIES, page, limit],
    queryFn: () => propertyApi.getAll(payload),
  })
}

export const usePropertyDetail = (propertyId: string, options?: QueryOptionType<PropertyTypes>) => {
  return useQuery({
    ...options,
    queryKey: [PROPERTY_QUERY.PROPERTY_DETAIL, propertyId],
    queryFn: () => propertyApi.getDetail(propertyId),
    enabled: !!propertyId,
  })
}

export const useCreatePropertyInformation = () => {
  return useMutation({
    mutationKey: [PROPERTY_QUERY.CREATE_INFORMATION_PROPERTY],
    mutationFn: (payload: PropertyInformationType) => propertyApi.create(payload),
  })
}

export const useUpdatePropertyInformation = (propertyId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [PROPERTY_QUERY.UPDATE_INFORMATION_PROPERTY, propertyId],
    mutationFn: (payload: PropertyInformationType & CommonReq) =>
      propertyApi.updateInformation({ ...payload, propertyId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PROPERTY_QUERY.PROPERTY_DETAIL, propertyId],
      })
    },
  })
}
export const useUpdatePropertyReturns = (propertyId: string) => {
  return useMutation({
    mutationKey: [PROPERTY_QUERY.UPDATE_INFORMATION_PROPERTY, propertyId],
    mutationFn: (payload: PropertyReturnsType & CommonReq) =>
      propertyApi.updateReturns({ ...payload, propertyId }),
  })
}
export const useUpdatePropertyFinanceBreakdown = (propertyId: string) => {
  return useMutation({
    mutationKey: [PROPERTY_QUERY.UPDATE_INFORMATION_PROPERTY, propertyId],
    mutationFn: (payload: PropertyFinancialBreakdownType & CommonReq) =>
      propertyApi.updateFinancialBreakdown({ ...payload, propertyId }),
  })
}
export const useUpdatePropertyDocument = (propertyId: string) => {
  return useMutation({
    mutationKey: [PROPERTY_QUERY.UPDATE_INFORMATION_PROPERTY, propertyId],
    mutationFn: (payload: PropertyDocumentsType & CommonReq) =>
      propertyApi.updateDocument({ ...payload, propertyId }),
  })
}
export const usePublishedProperty = (propertyId: string) => {
  return useMutation({
    mutationKey: [PROPERTY_QUERY.UPDATE_INFORMATION_PROPERTY, propertyId],
    mutationFn: (payload: PublishedPropertyType & CommonReq) =>
      propertyApi.published({ ...payload, propertyId }),
  })
}
