export const asyncMap = async <T, U>(
  array: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> => {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    result.push(await callback(array[i], i));
  }
  return result;
};
