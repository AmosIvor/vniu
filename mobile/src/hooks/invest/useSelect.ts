import {Types} from '@type/index';

import {useCallback, useEffect, useState} from 'react';

import {TBaseOptionData} from '@components/ui/invest/commons/select/types';

type TUseSelectProps<T extends TBaseOptionData> = {
  defaultValue?: T;
  onChangeValue: (value: T) => void;
};
const useSelect = <T extends TBaseOptionData>({
  defaultValue,
  onChangeValue,
}: TUseSelectProps<T>) => {
  const [activeOption, setActiveOption] = useState<Types.util.maybe<T>>();

  const handleChangeValue = useCallback(
    (value: T) => {
      setActiveOption(() => value);
      onChangeValue(value);
    },
    [onChangeValue],
  );

  const checkActiveOption = useCallback(
    (option: T): boolean => {
      return activeOption?.value === option.value;
    },
    [activeOption],
  );

  useEffect(() => {
    if (defaultValue) {
      handleChangeValue(defaultValue);
    }
  }, [defaultValue, handleChangeValue]);

  return {
    activeOption,
    handleChangeValue,
    checkActiveOption,
  };
};

export default useSelect;
