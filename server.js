const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouter = require('./src/routes/UserRoute');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});