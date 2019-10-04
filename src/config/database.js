const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    logging: true
  }
}


