const Task = require('../Task.schema');

const taskService = {};

taskService.createTask = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { task, isComplete } = req;

    const newTask = new Task({ task, isComplete });
    await newTask.save();

    req.statusCode = 200;
    req.data = newTask;
  } catch (e) {
    req.error = e.message;
  }
  next();
};

taskService.getTask = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const taskList = await Task.find({});

    req.statusCode = 200;
    req.data = taskList;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

taskService.putTask = async (req, res, next) => {
  try {
    if (req.statusCode === 400) return next();

    const { id } = req.params;
    const { isComplete } = req.body;
    const putTask = await Task.updateOne({ _id: id }, { $set: { isComplete } });

    req.statusCode = 200;
    req.data = putTask;
  } catch (e) {
    req.statusCode = 400;
    req.error = e.message;
  }
  next();
};

module.exports = taskService;
