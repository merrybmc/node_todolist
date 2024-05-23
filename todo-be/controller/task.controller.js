const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;

    const newTask = new Task({ task, isComplete });

    await newTask.save();

    res.status(200).json({ status: 'ok', data: newTask });
  } catch (e) {
    res.status(200).json({ status: 'fail', error: e.message });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({});

    res.status(200).json({ status: 'ok', data: taskList });
  } catch (e) {
    res.status(400).json({ status: 'fail', data: e.message });
  }
};

module.exports = taskController;
