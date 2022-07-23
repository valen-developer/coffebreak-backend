export const cleanArray = <T>(array: (T | null | undefined)[]): T[] => {
  const cleanArray: unknown[] = array.filter(
    (item) => item !== null && item !== undefined
  );

  return cleanArray as T[];
};
