const { SECRET_KEY = 'secret-key', HASH_LENGTH = 10 } = process.env;

module.exports = { SECRET_KEY, HASH_LENGTH: Number(HASH_LENGTH) };
