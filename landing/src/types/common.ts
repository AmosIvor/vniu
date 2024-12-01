import type { UseQueryOptions } from '@tanstack/react-query'

export type Assign<T, U> = Omit<T, keyof U> & U

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]

export type NonEmptyArray<T> = [T, ...T[]] | [...T[], T] | [T, ...T[], T]
export type NonEmptyJSXElementArray =
  | [JSX.Element, ...JSX.Element[]]
  | [...JSX.Element[], JSX.Element]
  | [JSX.Element, ...JSX.Element[], JSX.Element]

export type CommonReq = {
  propertyId?: string
  propertyType?: string
  callback?: () => void
  keyword?: string
  provinceId?: string
  districtId?: string
}

export type PagingReq = {
  page?: number
  limit?: number
  isFull?: boolean
}

export type MetaResponseType = { nextPage: number; page: number; prevPage: number; total: number }

export type BaseResponseType<T> = {
  data: T[]
  meta?: MetaResponseType
}
export type QueryOptionType<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
