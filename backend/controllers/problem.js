const problemRouter = require('express').Router();
const Assignment = require('../models/assignment');
const Problem = require('../models/problem');

problemRouter.get('/', async (req, res) => {
  const problems = await Problem.find({});
  res.status(201).json(problems);
});
problemRouter.post('/:id', async (req, res) => {
  const { keywords, explanation } = req.body;

  const assignment = await Assignment.findById(req.params.id)

  const problem = new Problem({
    keywords,
    explanation
  })

  const savedProblem = await problem.save()

  assignment.problems = assignment.problems.concat(savedProblem);

  res.status(201).json(savedProblem);
});

module.exports = problemRouter;