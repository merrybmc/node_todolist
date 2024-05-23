const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('get tasks');
});

router.post('/', (req, res) => {
  res.send('create task');
});

router.put('/:id', (req, res) => {
  res.send('update task');
});

router.delete('/:id', (req, res) => {
  res.send('delete task');
});

module.exports = router;
