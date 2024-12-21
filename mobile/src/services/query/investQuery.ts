import {useAppInfiniteQueryWithGet} from '@hooks/app/useAppQuery';
import {testParser} from '@services/parser/investParser';
import {TTest} from '@type/app/investType';

import {API_URL} from '@constants/api';

export const useTestList = () => {
  return useAppInfiniteQueryWithGet<unknown, TTest>({
    url: API_URL.test,
    parser: testParser,
  });
};

export const investQuery = {
  useTestList,
};
