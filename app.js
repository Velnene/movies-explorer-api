require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { route } = require('./routes');

const app = express();
app.use(cors());

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

app.use(helmet());

app.use(route);

mongoose.connect(MONGO_URL, {});

app.listen(PORT, () => { });
