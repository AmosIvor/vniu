import {useCallback, useEffect, useState} from 'react';

import {useAppNavigation} from './useAppNavigation';

export const useAppResetDefaultRouter = () => {
  const {reset} = useAppNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleResetRouter = useCallback(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (isLoading) {
        reset({index: 0, routes: [{name: 'BottomTab'}]});
      }
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [reset, isLoading]);

  return {isLoading, handleResetRouter};
};
