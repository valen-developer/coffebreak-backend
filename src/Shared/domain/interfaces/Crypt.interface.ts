export const CRYPT_SALT_ROUNDS = 10;

export abstract class ICrypt {
  abstract hash(value: string, salt: number): string;
  abstract compare(value: string, hash: string): boolean;
}
