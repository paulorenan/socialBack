const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRouter = require('./src/routes/UserRoute');
const LoginRouter = require('./src/routes/LoginRoute');
const LoadRouter = require('./src/routes/LoadSessionRoute');
const PostRouter = require('./src/routes/PostRoute');
const AnswerRouter = require('./src/routes/AnswerRoute');
const LikeRouter = require('./src/routes/LikeRoute');
const FollowerRouter = require('./src/routes/FollowerRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', UserRouter);
app.use('/api/login', LoginRouter);
app.use('/api/load', LoadRouter);
app.use('/api/posts', PostRouter);
app.use('/api/answers', AnswerRouter);
app.use('/api/likes', LikeRouter);
app.use('/api/followers', FollowerRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;