import {produce} from 'immer';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {zustandStorage} from '@configs/zustand';

export type TAppStoreState = {
  auth: {token: string | null; refreshToken: string | null};
  session: {isShowIntro: boolean};
  setAuth: (props: {token: string | null; refreshToken: string | null}) => void;
  clearAuth: () => void;
  setShowIntro: (isShowIntro: boolean) => void;
};

export const useAppStore = create(
  persist<TAppStoreState>(
    set => ({
      auth: {token: null, refreshToken: null},
      session: {isShowIntro: true},
      setAuth: ({token, refreshToken}) => {
        set(
          produce(state => {
            state.auth.token = token;
            state.auth.refreshToken = refreshToken;
          }),
        );
      },
      clearAuth: () => {
        set(
          produce(state => {
            state.auth.token = undefined;
            state.auth.refreshToken = undefined;
          }),
        );
      },
      setShowIntro: isShowIntro => {
        set(
          produce(state => {
            state.session.isShowIntro = isShowIntro;
          }),
        );
      },
    }),
    {
      name: 'app',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
