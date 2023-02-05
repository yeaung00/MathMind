const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/user');
const assignmentRouter = require('./controllers/assignment');
const problemRouter = require('./controllers/problem');
const coursesRouter = require('./controllers/courses');
const userCourseRouter = require('./controllers/userCourse');
mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected to mongodb'));

app.use(express.json())
app.use(cors())

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use(middleware.tokenExtractor);
app.use('/api/assignments', assignmentRouter);
app.use('/api/assignments/problems', problemRouter);
app.use(middleware.getCourses);
app.use('/api/courses', coursesRouter);
//app.use('/api/userCourses', coursesRouter);
app.use('/api/users', userCourseRouter);
app.listen(3001, () => console.log('listening on http://localhost:3001'))