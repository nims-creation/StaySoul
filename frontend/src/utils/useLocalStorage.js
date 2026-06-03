import { useState, useEffect } from 'react';

/**
 * Custom hook that syncs state with localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if key not found
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (err) {
      console.warn(`useLocalStorage error for key "${key}":`, err);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`useLocalStorage removeValue error for key "${key}":`, err);
    }
  };

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
