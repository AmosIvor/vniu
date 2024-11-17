import {useAppQuery} from '@hooks/app/useAppQuery';
import {accountProfileParser} from '@services/parser/accountParser';
import {TAccountProfile} from '@type/app/accountType';

import {API_URL} from '@constants/api';

export const useGetProfileQuery = () => {
  return useAppQuery<unknown, TAccountProfile>({
    url: API_URL.USER.PROFILE,
    parser: accountProfileParser,
  });
};
