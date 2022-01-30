export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  // 不要污染传入的对象
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!value) {
      delete result[key];
    }
  });
  return result;
};
