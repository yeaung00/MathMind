const userCourseRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');
const Course = require('../models/course');

userCourseRouter.post('/:username/courses', async (req, res) => {
  console.log('req.token', req.token)
  const { courseName } = req.body;
  const decodedToken = jwt.verify(req.token, config.SECRET);
  const user = await User.findById(decodedToken.id);

  const newCourse = new Course({ courseName });
  const savedCourse = await newCourse.save();
  user.courses = user.courses.concat(savedCourse);
  await user.save();
  res.status(201).json(savedCourse);
})

module.exports = userCourseRouter;