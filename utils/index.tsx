import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setLocalStorageItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error setting item to local storage', error);
  }
};

export const getLocalStorageItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const removeLocalStorageItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};
