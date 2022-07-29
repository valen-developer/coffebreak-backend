export type DeepRequired<T> = T extends any
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : never;
