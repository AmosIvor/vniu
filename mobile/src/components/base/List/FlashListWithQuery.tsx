import {TResponseInfiniteQuery} from '@hooks/app/useAppQuery';
import {
  FlashListProps,
  ListRenderItem,
  FlashList as RNFlashList,
} from '@shopify/flash-list';
import {InfiniteData, UseInfiniteQueryResult} from '@tanstack/react-query';

import React, {useCallback} from 'react';

import {RefreshControl, View} from 'react-native';

import {COLORS} from '@assets/color';

import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import {useList} from './useList';

type TFlashListProps<T> = {
  query: UseInfiniteQueryResult<
    InfiniteData<TResponseInfiniteQuery<T>, unknown>,
    Error
  >;
  estimatedItemSize: number;
  renderItem: ListRenderItem<T> | null | undefined;
} & Omit<FlashListProps<T>, 'data'>;
const FlashList = <T,>({
  query,
  estimatedItemSize,
  renderItem,
  ...props
}: TFlashListProps<T>) => {
  const {
    data,
    isFetchingNextPage,
    refetch,
    isRefetching,
    fetchNextPage,
    isPending,
  } = useList({
    query,
  });

  const _renderListFooterComponent = useCallback(() => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size={30} color="ELEMENT_ACCENT" />;
    }
    return null;
  }, [isFetchingNextPage]);
  const _renderItemSeparatorComponent = useCallback(() => {
    return <View />;
  }, []);

  if (isPending) {
    return <ActivityIndicator size={30} color="ELEMENT_ACCENT" />;
  }
  return (
    <>
      <RNFlashList<T>
        estimatedItemSize={estimatedItemSize}
        renderItem={renderItem}
        data={data}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={_renderItemSeparatorComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={COLORS.ELEMENT_ACCENT}
          />
        }
        ListFooterComponent={_renderListFooterComponent}
        {...props}
      />
    </>
  );
};
export default FlashList;
