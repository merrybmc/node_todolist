const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.REACT_APP_BACKEND_PROD;

const corsOptions = {
  origin: [
    'https://d2iujalm5eztfq.cloudfront.net/',
    'http://localhost:3000',
    'http://nunatodo.s3-website-us-east-1.amazonaws.com/',
  ],
};

app.use(bodyParser.json());
app.use('/api', indexRouter);
app.use(cors(corsOptions));

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
