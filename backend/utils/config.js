require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const CATALOG_URL = process.env.CATALOG_URL;

const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  CATALOG_URL,
  SECRET,
}