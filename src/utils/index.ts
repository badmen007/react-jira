import { useEffect, useRef, useState } from "react";

//排除只是0的情况
export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  // 不要污染传入的对象
  //Object.assign({}, object) 相当于
  /*let a: object; 
  a = {name: 'xz'}
  a = new RegExp('');
  a = () => {}
  可以赋很多类型的值 并不是我们想要的 键值对  */

  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  // 这个主要是为了  页面刷新就执行一次
  useEffect(() => {
    callback();
    // TODO 依赖项中放入callback的话 会造成无限循环的现象
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

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  //https://zh-hans.reactjs.org/docs/hooks-reference.html#useref
  //useRef  在整个的生命周期中是不变化的  用来记录老的值
  // 其实本质上就是一个对象 {current: x}
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //由于闭包的原因 在依赖为空的时候拿到的值永远是老的值
        document.title = oldTitle;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, keepOnUnmount]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
