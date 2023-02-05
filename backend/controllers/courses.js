const coursesRouter = require('express').Router();

coursesRouter.get('/', async (req, res) => {
  res.status(201).json(req.courses);
});

module.exports = coursesRouter;