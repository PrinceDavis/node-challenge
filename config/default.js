// used .env file to store sensitive data
require('dotenv').config();
const Joi = require('joi');
const path = require('path');
const fs = require('fs');

const schema = Joi.object({
  DB_PASSWORD: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  HOST: Joi.string().required(),
  PORT: Joi.number().required(),
}).unknown().required();

// validate env values
const { error, value } = schema.validate(process.env);
if (error) throw new Error(`Config validation failed ${error.message}`);

module.exports = {
  db: {
    password: value.DB_PASSWORD,
    database: value.DB_NAME,
    user: value.DB_USER,
    host: value.DB_HOST,
    port: value.DB_PORT,
  },
  redisUrl: value.REDIS_URL,
  debug: {
    stackSize: 4,
  },
  i18next: {
    translationFilePath: path.resolve(__dirname, '..', 'locales/{{lng}}/{{ns}}.json'),
  },
  host: value.HOST,
  https: {
    enabled: false,
    key: fs.readFileSync(path.resolve(__dirname, '..', 'certs/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', 'certs/cert.pem')),
  },
  port: value.PORT,
  auth: {},
  shutdown: {
    appKill: 1000,
    serverClose: 100,
  },
};
