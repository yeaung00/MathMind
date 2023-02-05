const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Assignment = require('../models/assignment');
const Course = require('../models/course');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

userRouter.get('/:username', async (req, res) => {
  console.log('get user')
  const users = await User.findOne({ username: req.params.username })
    .populate('assignments')
    .populate('courses')
  res.status(201).json(users);
})
userRouter.get('/', async (req, res) => {
  console.log('get all')
  const users = await User.find({});
  res.status(201).json(users);
})
userRouter.post('/', async (req, res) => {
  console.log('sign up')
  const { username, password, role } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    password: passwordHash,
    role
  })

  const savedUser = await user.save();

  res.status(201).json(savedUser)
})
userRouter.get('/courses', async (req, res) => {
  console.log('get courses')
  const decodedToken = jwt.verify(req.token, config.SECRET);
  const user = await User.findById(decodedToken.id);
  res.status(201).json(user.courses);
})

module.exports = userRouter;