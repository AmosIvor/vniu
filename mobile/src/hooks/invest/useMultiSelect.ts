import {Types} from '@type/index';

import {useCallback, useState} from 'react';

import {TBaseOptionData} from '@components/ui/invest/commons/select/types';

type TUseMultiSelectProps<T extends TBaseOptionData> = {
  defaultValues: T[];
  onChangeValue: (value: T) => void;
};

const useMultiSelect = <T extends TBaseOptionData>({
  onChangeValue,
  defaultValues = [],
}: TUseMultiSelectProps<T>) => {
  const [activeOption, setActiveOption] =
    useState<Types.util.maybe<T>[]>(defaultValues);

  const handleChangeValue = useCallback(
    (selectedValue: T) => {
      const isExistOption = activeOption?.some(
        item => item?.value === selectedValue.value,
      );
      if (isExistOption) {
        setActiveOption(
          activeOption?.filter(item => item?.value !== selectedValue.value),
        );
      } else {
        setActiveOption([...activeOption, selectedValue]);
      }
      onChangeValue(selectedValue);
    },
    [activeOption, onChangeValue],
  );

  const checkActiveOption = useCallback(
    (option: T): boolean => {
      return activeOption?.some(item => item?.value === option.value) || false;
    },
    [activeOption],
  );

  return {
    handleChangeValue,
    checkActiveOption,
    activeOption,
  };
};

export default useMultiSelect;
