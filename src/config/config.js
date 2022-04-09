require('dotenv').config();

const { PASSWORD_DB, HOST, DATABASE, DB_USERNAME, PORT } = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": PASSWORD_DB,
    "database": DATABASE,
    "host": HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": PASSWORD_DB,
    "database": DATABASE,
    "host": HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": PASSWORD_DB,
    "database": DATABASE,
    "host": HOST,
    "dialect": "postgres"
  }
}
