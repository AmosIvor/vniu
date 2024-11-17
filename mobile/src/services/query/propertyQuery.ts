import {useAppInfiniteQueryWithPost, useAppQuery} from '@hooks/app/useAppQuery';
import {
  propertiesParser,
  propertyParser,
} from '@services/parser/propertyParser';
import {TInvest} from '@type/app/itemType';
import {TPropertyRequestType} from '@type/service/request/propertyRequest';

import {API_URL} from '@constants/api';

export const useGetPropertyQuery = (
  keyword?: string,
  propertyType?: string[],
  apartmentType?: string[],
  landType?: string[],
) => {
  return useAppInfiniteQueryWithPost<TPropertyRequestType, TInvest>({
    url: API_URL.PROPERTY.PROPERTIES,
    req: {limit: 10, keyword, propertyType, apartmentType, landType},
    parser: propertiesParser,

    option: {
      refetchOnMount: 'always',
    },
  });
};
export const useGetPropertyWithIdQuery = (id: string) => {
  return useAppQuery<unknown, TInvest>({
    url: API_URL.PROPERTY.PREFIX_PROPERTY + `/${id}`,
    option: {
      refetchOnMount: 'always',
    },
    parser: propertyParser,
  });
};
