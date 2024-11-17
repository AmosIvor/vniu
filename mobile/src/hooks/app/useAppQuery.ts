import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { apiClient } from '@configs/apiClient'
import { ENV } from '@configs/env'
import { getStorageData } from '@utils'

const token = getStorageData('app')?.state.auth.token || ''
export type TQueryError = AxiosError<{ message?: string }>

export type TResponseInfiniteQuery<Res> = {
  data: Res[]
  meta: {
    total: number
    page: number
    nextPage: string
    prevPage: string
  }
}

type QueryParams<Req, Res> = {
  req?: { limit?: number; keyword?: string } & Req
  url: string
  key?: string
  parser?: (data: any[]) => Res[]
  option?: Omit<UseInfiniteQueryOptions<any>, 'getNextPageParam' | 'queryKey' | 'initialPageParam'>
}

export const useAppInfiniteQueryWithGet = <Req, Res>({ req, url, key, parser, option }: QueryParams<Req, Res>) => {
  return useInfiniteQuery<TResponseInfiniteQuery<Res>, Error, InfiniteData<TResponseInfiniteQuery<Res>>>({
    queryKey: [key ? key : url, req],
    queryFn: async ({ queryKey, pageParam }): Promise<TResponseInfiniteQuery<Res>> => {
      const [_, queryParams] = queryKey

      try {
        const response: AxiosResponse<TResponseInfiniteQuery<Res>> = await apiClient.get(url, {
          params: Object.assign({}, queryParams, {
            page: pageParam || 1
          })
        })
        const { meta, data } = response.data
        if (parser) {
          return {
            meta,
            data: parser(data)
          } as TResponseInfiniteQuery<Res>
        }
        return { meta, data } as TResponseInfiniteQuery<Res>
      } catch (error) {
        throw error
      }
    },
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => {
      return meta.nextPage || undefined
    },

    ...option
  })
}
export const useAppInfiniteQueryWithPost = <Req, Res>({ req, url, key, parser, option }: QueryParams<Req, Res>) => {
  return useInfiniteQuery<TResponseInfiniteQuery<Res>, Error, InfiniteData<TResponseInfiniteQuery<Res>>>({
    queryKey: [key ? key : url, req],
    queryFn: async ({ queryKey, pageParam }): Promise<TResponseInfiniteQuery<Res>> => {
      const [_, queryParams] = queryKey

      try {
        const response: AxiosResponse<TResponseInfiniteQuery<Res>> = await apiClient.post(
          url,
          Object.assign({}, queryParams, {
            page: pageParam || 1
          })
        )
        const { meta, data } = response.data
        if (parser) {
          return {
            meta,
            data: parser(data)
          } as TResponseInfiniteQuery<Res>
        }
        return { meta, data } as TResponseInfiniteQuery<Res>
      } catch (error) {
        throw error
      }
    },
    initialPageParam: 1,
    getNextPageParam: ({ meta }) => {
      return meta.nextPage || undefined
    },

    ...option
  })
}
type TMutationQueryParams<Req, Res> = {
  url: string
  key?: string
  parser?: (data: any) => Res
  option?: UseMutationOptions<Res, TQueryError, Req>
}
type TQueryParams<Res> = {
  url: string
  key?: string
  parser?: (data: any) => Res
  option?: Omit<UseQueryOptions<any>, 'queryKey'>
}

export const useAppQuery = <Req, Res>({ url, option, key, parser }: TQueryParams<Res>) => {
  return useQuery<Req, Error, Res>({
    queryKey: [key ? key : url],
    queryFn: async (req) => {
      try {
        const response = await apiClient.get(url, req)
        if (parser) {
          return parser(response.data)
        }
        return response.data
      } catch (error) {
        throw error
      }
    },
    ...option
  })
}
export const useAppMutation = <Req, Res>({ url, option, key, parser }: TMutationQueryParams<Req, Res>) => {
  return useMutation({
    mutationKey: [key ? key : url],
    mutationFn: async (req) => {
      try {
        const response = await apiClient.post(url, req)
        if (parser) {
          return parser(response.data)
        }
        return response.data
      } catch (error) {
        throw error
      }
    },
    ...option
  })
}

export const useAppMutationFormData = <Req extends Record<string, any>, Res>({
  url,
  option,
  key,
  parser
}: TMutationQueryParams<Req, Res>) => {
  return useMutation({
    mutationKey: [key ? key : url],
    mutationFn: async (req) => {
      const formData = new FormData()
      // eslint-disable-next-line @typescript-eslint/no-shadow
      Object.keys(req).forEach((key) => {
        formData.append(key, req[key])
      })
      console.log('🚀 ~ Object.keys ~ formData:', formData)

      try {
        const response = await fetch(`${ENV.API_URL}${url}`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || response.statusText)
        }
        const data = await response.json()
        if (parser) {
          return parser(data)
        }
        return data
      } catch (error) {
        throw error
      }
    },
    ...option
  })
}
