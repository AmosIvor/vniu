import {TAppStoreState} from '@stores/appStore';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

type TStorageKeyValue = {
  accessToken: string;
  app: {state: TAppStoreState};
};

type TStorageKey = keyof TStorageKeyValue;

type TStorageValueByKey<Key extends TStorageKey> = TStorageKeyValue[Key];

export const getStorageData = <Key extends TStorageKey>(
  key: Key,
): TStorageValueByKey<Key> | null => {
  try {
    if (!storage.contains(key)) {
      return null;
    }

    const jsonValue = storage.getString(key);

    return jsonValue
      ? (JSON.parse(jsonValue) as TStorageValueByKey<Key>)
      : null;
  } catch (e) {
    return null;
  }
};

export const setStorageData = <Key extends TStorageKey>(
  key: Key,
  value: TStorageValueByKey<Key>,
) => {
  try {
    storage.set(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

export const removeStorageData = <Key extends TStorageKey>(key: Key) => {
  try {
    if (!storage.contains(key)) {
      return true;
    }

    storage.delete(key);

    return true;
  } catch (e) {
    return false;
  }
};

export const removeStorageMultiData = <Key extends TStorageKey>(
  keys: Key[],
) => {
  keys.forEach(removeStorageData);
  return true;
};

export const updateStorageData = <Key extends TStorageKey>(
  key: Key,
  updater: (value: TStorageValueByKey<Key>) => TStorageValueByKey<Key>,
) => {
  const prev = getStorageData(key);

  if (!prev) {
    return;
  }

  setStorageData(key, updater(prev));
};
