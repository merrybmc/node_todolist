const express = require('express');
const router = express.Router();
const taskApi = require('../entitys/tasks/task.api');
const userApi = require('../entitys/users/user.api');

router.use('/tasks', taskApi);
router.use('/user', userApi);

module.exports = router;
