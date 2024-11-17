import {Ref, useImperativeHandle} from 'react';

import type {ProgrammaticZoomCallback, ZoomableRef} from '../types.tsx';

export const useZoomableHandle = (
  ref: Ref<unknown> | undefined,
  reset: () => void,
  zoom: ProgrammaticZoomCallback,
) => {
  useImperativeHandle(
    ref,
    (): ZoomableRef => ({
      reset() {
        reset();
      },
      zoom(event: any) {
        zoom(event);
      },
    }),
    [reset, zoom],
  );
};
