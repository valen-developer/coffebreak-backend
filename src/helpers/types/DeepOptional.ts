/*
User = {
    name: string,
    email: string,
}

DeepOptional<User> = {
    name?: string,
    email?: string,
}

*/

export type DeepOptional<T> = T extends any
  ? { [K in keyof T]?: DeepOptional<T[K]> }
  : never;
