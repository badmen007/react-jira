import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  //URLSearchParams
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {}) as { [key in K]: string },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      //iterator  可以用for..of 进行遍历
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

//怎么让不同的变量拥有同一个类型
// const a = ['jack', 12, {gender: 'male'}] as const;

//简单iterator 的实现
/* const obj = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
      const self = this;
      let index = 0;
      console.log(self)
      return {
        next() {
          if(index < self.data.length) {
            return {
              value: self.data[index++],
              done: false
            }
          }else{
            return {
              value: undefined,
              done: true
            }
          }
        }
      }
    }
  }
  
  for(let o of obj) {
    console.log(o);
  }
 */
