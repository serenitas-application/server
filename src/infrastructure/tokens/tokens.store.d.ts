export declare class TokensStore {
  create(key: string | number, value: string): Promise<string>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
}
