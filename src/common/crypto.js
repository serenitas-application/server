import crypto from 'node:crypto';

const hash = (value) =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('base64');
    crypto.scrypt(value, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(salt + ':' + result.toString('base64'));
    });
  });

const verify = (hashedValue, value) =>
  new Promise((resolve, reject) => {
    const [salt, hashed] = hashedValue.split(':');
    crypto.scrypt(value, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(hashed === result.toString('base64'));
    });
  });

const generate = (id) => `TEST${id}TEST`;

export const cryptoService = { hash, verify, generate };
