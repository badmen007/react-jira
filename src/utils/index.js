import { useEffect, useState } from "react";
export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  // 不要污染传入的对象
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  // 这个主要是为了  页面刷新就执行一次
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
