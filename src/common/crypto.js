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

const generate = (id) => `TEST${id}TEST`;

export const crypto = { hash, verify, generate };
