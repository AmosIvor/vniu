import {createContext, useContext} from 'react';

type SkeletonContextType = {
  borderRadius?: number;
};
export const SkeletonContext = createContext<SkeletonContextType>({
  borderRadius: 0,
});

export const SkeletonProvider = SkeletonContext.Provider;
export const useSkeletonContext = () => useContext(SkeletonContext);
