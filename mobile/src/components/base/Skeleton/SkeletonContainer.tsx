import React from 'react';

import {SkeletonContext} from './context';

interface ISkeletonContainerProps {
  borderRadius?: number;
  children?: React.ReactNode;
}
const SkeletonContainer = ({
  borderRadius,
  children,
}: ISkeletonContainerProps) => {
  return (
    <SkeletonContext.Provider value={{borderRadius}}>
      {children}
    </SkeletonContext.Provider>
  );
};
export default SkeletonContainer;
