require('dotenv').config();

module.exports = {
  "development": {
    'username' : process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': 'localhost',
    'dialect':  process.env.DB_CLIENT,
  },
  "test": {
    'username' : process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'dialect':  process.env.DB_CLIENT,
  },
  "production": {
    'username' : process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_NAME,
    'host': process.env.DB_HOST,
    'dialect':  process.env.DB_CLIENT,
  }
}
