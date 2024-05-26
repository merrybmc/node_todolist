const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const mongoURI = process.env.REACT_APP_BACKEND_PROD;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 5000;

const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true, // header의 정보가 안전한 것이라고 브라우저가 판단할 수 있게
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use('/api', indexRouter);

console.log(mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('mongoose connect');
  })
  .catch((e) => {
    console.log('DB connect fail', e);
  });

app.listen(port, () => {
  console.log('server on 5000');
});
