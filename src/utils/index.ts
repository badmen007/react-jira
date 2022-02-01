import { useEffect, useState } from "react";

//排除只是0的情况
export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (object: object) => {
  // 不要污染传入的对象
  //Object.assign({}, object) 相当于
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    //@ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  // 这个主要是为了  页面刷新就执行一次
  useEffect(() => {
    callback();
  }, []);
};

//V 泛型
export const useDebounce = <V>(value: V, delay?: number) => {
  //可传可不传
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
