import React, {useState} from 'react';

import {RefreshControl, ScrollView} from 'react-native';

import Show from '../Show/Show';

interface ILayoutBodyScrollViewProps {
  children?: React.ReactNode;
  refreshFunction?: () => void;
}

const LayoutBodyScrollView = ({
  children,
  refreshFunction,
}: ILayoutBodyScrollViewProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      refreshFunction?.();
      setRefreshing(false);
    }, 2000);
  };

  return (
    <>
      <Show>
        <Show.When isTrue={!!refreshFunction}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {children}
          </ScrollView>
        </Show.When>
        <Show.Else>
          <ScrollView>{children}</ScrollView>
        </Show.Else>
      </Show>
    </>
  );
};

export default LayoutBodyScrollView;
