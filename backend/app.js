require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const helmet = require("helmet");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require("cors");
var favicon = require('serve-favicon');
var fs = require('fs');


const getAccessRouter = require("./src/users/getAccess");
const registerFirstRouter = require('./src/users/registerFirst');

const registerUserRouter = require('./src/users/register');
const getAllUsersRouter = require('./src/users/getAll');
const updateUsersRouter = require('./src/users/update');
const deleteUserRouter = require('./src/users/delete');

const registerArticleRouter = require('./src/articles/register');
const getAllArticlesRouter = require('./src/articles/getAll');
const updateArticlesRouter = require('./src/articles/update');
const deleteArticleRouter = require('./src/articles/delete');


const app = express();
app.use(helmet());
console.log("Server started at: " + process.env.SERVER.replace("/api/v1/", "") + (process.env.PORT || ""));
var corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(express.static('src/public'));
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname,'src','public','images','favicon.png')));

app.use("/api/v1/users/getAccess", getAccessRouter);
app.use("/api/v1/users/registerFirst", registerFirstRouter);

app.use("/api/v1/users/register", registerUserRouter);
app.use("/api/v1/users/getAll", getAllUsersRouter);
app.use("/api/v1/users/update", updateUsersRouter);
app.use("/api/v1/users/delete", deleteUserRouter);

app.use("/api/v1/articles/register", registerArticleRouter);
app.use("/api/v1/articles/getAll", getAllArticlesRouter);
app.use("/api/v1/articles/update", updateArticlesRouter);
app.use("/api/v1/articles/delete", deleteArticleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.set('Content-Type', 'image/jpg');
  // res.send(fs.readFileSync(path.join(__dirname, 'src/public/images/error.jpg')));
  res.json({message: err});
});

module.exports = app;