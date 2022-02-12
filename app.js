const express = require('express');
const app = express();
const taskRouter = require('./src/controllers/task');
const userRouter = require('./src/controllers/user');
const projectRouter = require('./src/controllers/project');

app.use(express.json());
app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

module.exports = app;