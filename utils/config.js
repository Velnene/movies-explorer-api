require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  SECRET_KEY = 'some-secret-key',
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  SECRET_KEY,
};
