const assignmentRouter = require('express').Router();
const User = require('../models/user');
const Assignment = require('../models/assignment');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

assignmentRouter.get('/', async (req, res) => {
  const assignments = await Assignment.find({}).populate('problems');
  res.status(201).json(assignments);
})
assignmentRouter.post('/', async (req, res) => {
  const { description, feedback } = req.body;
  const decodedToken = jwt.verify(req.token, config.SECRET);
  const user = await User.findById(decodedToken.id).populate('assignments');

  const assignment = new Assignment({
    description,
    feedback
  })
  const savedAssignment = await assignment.save();

  user.assignments = user.assignments.concat(savedAssignment);

  const savedUser = await user.save();

  res.status(201).json(savedUser)
})

module.exports = assignmentRouter;