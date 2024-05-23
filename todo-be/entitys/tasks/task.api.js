const express = require('express');
const taskController = require('./controller/task.controller');
const intercepter = require('../../common/exception/http-exception.filter');
const taskService = require('./service/task.service');
const router = express.Router();

router.get('/', taskController.getTask, taskService.getTask, intercepter);

router.post('/', taskController.createTask, taskService.createTask, intercepter);

router.put('/:id', (req, res) => {
  res.send('update task');
});

router.delete('/:id', (req, res) => {
  res.send('delete task');
});

module.exports = router;
