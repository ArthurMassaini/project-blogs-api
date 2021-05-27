require('dotenv/config');

const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOSTNAME } = process.env;

module.exports = {
  development: {
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: 'blogs_api',
    host: MYSQL_HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: 'blogs_api',
    host: MYSQL_HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: 'blogs_api',
    host: MYSQL_HOSTNAME,
    dialect: 'mysql',
  },
};
