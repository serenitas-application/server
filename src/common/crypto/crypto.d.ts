export declare const crypto: {
  hash(value: string): Promise<string>;
  verify(hashedValue: string, value: string): Promise<boolean>;
  getRandomId(): string;
  generateToken(length: number): string;
};
