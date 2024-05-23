const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/api', indexRouter);

const mongoURI = `mongodb://localhost:27017/todo-demo`;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('mongoose connect');
  })
  .catch((e) => {
    console.log('DB connect fail', e);
  });

app.listen(5000, () => {
  console.log('server on 5000');
});
