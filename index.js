const express = require('express');
const app = express();
const cors = require('cors'); 
const userRoutes = require('./routes/UserRoutes.js');
const taskRoutes = require('./routes/TaskRouts.js');
const commentRoutes = require('./routes/CommentRouts.js')
const siteRoutes = require('./routes/SiteRoutes.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type",
      'Content-Type: multipart/form-data'

  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/comments', commentRoutes);
app.use('/sites',siteRoutes)

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
