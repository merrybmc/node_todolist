const express = require('express');
const router = express.Router();
const taskApi = require('../entitys/tasks/task.api');

router.use('/tasks', taskApi);

module.exports = router;
