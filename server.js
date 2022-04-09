const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouter = require('./src/routes/UserRoute');
const LoginRouter = require('./src/routes/LoginRoute');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', UserRouter);
app.use('/api/login', LoginRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});