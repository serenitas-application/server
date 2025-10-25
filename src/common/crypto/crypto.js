import nodeCrypto from 'node:crypto';

const hash = (value) =>
  new Promise((resolve, reject) => {
    const salt = nodeCrypto.randomBytes(16).toString('base64');
    nodeCrypto.scrypt(value, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(salt + ':' + result.toString('base64'));
    });
  });

const verify = (hashedValue, value) =>
  new Promise((resolve, reject) => {
    const [salt, hashed] = hashedValue.split(':');
    nodeCrypto.scrypt(value, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(hashed === result.toString('base64'));
    });
  });

const getRandomId = () => nodeCrypto.randomUUID();

const generateToken = (length = 8) => {
  const chars = 'AaBbCcDdEeFfGgHhJjKkLlMmNnPpQqRrSsTtUuVvWwXxYyZz23456789';
  const bytes = nodeCrypto.randomBytes(length);
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars[bytes[i] % chars.length];
  }
  return token;
};

export const crypto = { hash, verify, getRandomId, generateToken };
