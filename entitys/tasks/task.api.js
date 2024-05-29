const express = require('express');
const taskController = require('./controller/task.controller');
const intercepter = require('../../common/exception/http-exception.filter');
const taskService = require('./service/task.service');
const authController = require('../auth/auth.repository');
const router = express.Router();

// 데이터 조회 Read
router.get('/', taskController.getTask, taskService.getTask, intercepter);

// 데이터 쓰기 Create
router.post(
  '/',
  authController.authenticate,
  taskController.createTask,
  taskService.createTask,
  intercepter
);

// 데이터 수정 Update
router.put('/:id', taskController.putTask, taskService.putTask, intercepter);

// 데이터 삭제 Delete
router.delete('/:id', taskController.deleteTask, taskService.deleteTask, intercepter);

module.exports = router;
