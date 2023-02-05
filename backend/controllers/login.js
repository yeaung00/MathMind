const loginRouter = require('express').Router();
const User = require('../models/user');
const Assignment = require('../models/assignment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('../utils/config');

loginRouter.post('/', async (req, res) => {
  const { username, password} = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password);
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    user: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET);

  res
    .status(200)
    .send({ token, user })
})

module.exports = loginRouter;