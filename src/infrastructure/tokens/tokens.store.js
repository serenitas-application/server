export class TokensStore {
  #tokens = new Map();

  async create(key, value) {
    this.#tokens.set(key, value);
    return value;
  }

  async get(sessionId) {
    return this.#tokens.get(sessionId) || null;
  }

  async delete(sessionId) {
    this.#tokens.delete(sessionId);
  }
}
