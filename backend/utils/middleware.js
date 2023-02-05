const cheerio = require('cheerio');
const axios = require('axios');
const config = require('./config');
const { v4: uuidv4 } = require('uuid');

const getCourses = async (req, res, next) => {
  const { data } = await axios.get(`${config.CATALOG_URL}`)
  const $ = cheerio.load(data);

  req.courses = $('.course-name').get().map(el => {
    const course = {
      name: $(el).children('a').text(),
      id: uuidv4(),
    }
    return course;
  })
  next();
}

const tokenExtractor = (req, res, next) => {
  console.log(req.get('authorization'));
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('auth', authorization)
    req.token = authorization.slice(7);
  }
  next();
}

module.exports = {
  getCourses,
  tokenExtractor
}