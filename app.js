require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const helmet = require('helmet');
const { route } = require('./routes');
const { PORT, MONGO_URL } = require('./utils/config');

const app = express();
// app.use(cors());

app.use(helmet());

app.use(route);

mongoose.connect(MONGO_URL, {});

app.listen(PORT, () => { });
