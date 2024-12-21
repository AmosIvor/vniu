import {TResponseInfiniteQuery} from '@hooks/app/useAppQuery';
import {InfiniteData, UseInfiniteQueryResult} from '@tanstack/react-query';
import {flatMap} from 'lodash';

import {useCallback, useEffect, useState} from 'react';

type TData<T> = {
  query: UseInfiniteQueryResult<
    InfiniteData<TResponseInfiniteQuery<T>, unknown>,
    Error
  >;
};

export const useList = <T,>({query}: TData<T>) => {
  const {
    data: queryData,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    isPending,
  } = query;

  const [data, setData] = useState<T[] | undefined>(undefined);

  useEffect(() => {
    if (queryData) {
      setData(() => {
        return flatMap(queryData.pages, page => page.data);
      });
    }
  }, [queryData]);

  const handleFetchNextPage = useCallback(() => {
    if (data) {
      fetchNextPage();
    }
  }, [data, fetchNextPage]);

  return {
    data,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    isPending,
    handleFetchNextPage,
  };
};
