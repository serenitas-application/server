export class SessionStore {
  #sessions = new Map();

  async create(payload) {
    const sessionId = this.#generateSessionId();
    this.#sessions.set(sessionId, payload);
    return sessionId;
  }

  async get(sessionId) {
    return this.#sessions.get(sessionId) || null;
  }

  async delete(sessionId) {
    this.#sessions.delete(sessionId);
  }

  #generateSessionId() {
    return crypto.randomUUID();
  }

  getSessionAgeInSeconds() {
    return 7 * 24 * 60 * 60;
  }
}
