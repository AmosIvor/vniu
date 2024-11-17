import {useCallback, useRef} from 'react';

const useAppDebounceActionWithCondition = (delay = 1000) => {
  const timeoutId = useRef<NodeJS.Timeout>();

  const debounce = useCallback(
    (callback: () => void) => {
      return (condition1: any, condition2: any) => {
        clearTimeout(timeoutId.current);
        if (condition1 !== condition2) {
          timeoutId.current = setTimeout(() => {
            callback();
          }, delay);
        }
      };
    },
    [delay],
  );

  return debounce;
};

export default useAppDebounceActionWithCondition;
