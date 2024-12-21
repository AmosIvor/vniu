import {useAppInfiniteQueryWithGet} from '@hooks/app/useAppQuery';
import {TCountry} from '@type/app/commons';

import {API_URL} from '@constants/api';

export const useCountries = ({keyword}: {keyword: string}) => {
  return useAppInfiniteQueryWithGet<any, TCountry>({
    req: {limit: 60, keyword},
    url: API_URL.META_DATA.COUNTRIES,
    option: {
      refetchOnMount: 'always',
    },
  });
};

export const investQuery = {
  useCountries,
};
