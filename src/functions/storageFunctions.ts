import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const setStorage = (key: string, value: string | number | boolean) => {
  try {
    storage.set(key, value);
  } catch (error) {
    console.log('Set storage error', error);
  }
};

const getStringStorage = (key: string) => {
  try {
    return storage.getString(key);
  } catch (error) {
    console.log('Get storage error', error);
  }
};

const getNumberStorage = (key: string) => {
  try {
    return storage.getNumber(key);
  } catch (error) {
    console.log('Get storage error', error);
  }
};
const getBooleanStorage = (key: string) => {
  try {
    return storage.getBoolean(key);
  } catch (error) {
    console.log('Get storage error', error);
  }
};

const getAllKeysStorage = () => {
  try {
    return storage.getAllKeys();
  } catch (error) {
    console.log('Get all keys storage error', error);
  }
};

const clearAllStorage = () => {
  try {
    storage.clearAll();
  } catch (error) {
    console.log('Clear all storage error', error);
  }
};

const removeStorage = (key: string) => {
  try {
    storage.delete(key);
  } catch (error) {
    console.log('Remove storage error', error);
  }
};

const checkIfHasInStorage = (key: string) => {
  try {
    return storage.contains(key);
  } catch (error) {
    console.log('check InStorage error', error);
  }
};

export {
  setStorage,
  getStringStorage,
  getNumberStorage,
  getBooleanStorage,
  removeStorage,
  clearAllStorage,
  checkIfHasInStorage,
  getAllKeysStorage,
};
