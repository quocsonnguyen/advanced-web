const createError = require('http-errors');
const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const db = require('./db');
const port = 3300

const app = express();
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

const io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.on('newPost', () => {
    io.emit('reRenderFeed')
  })

  socket.on('newNoti', (faculty) => {
    io.emit('reRenderNoti')
    io.emit('notice', faculty)
  })

  socket.on('newUser', () => {
    io.emit('reRenderUser')
  })

  socket.on('reloadFeed', () => {
    io.emit('reRenderFeed')
  })

  socket.on('editPost', (pid) => {
    io.emit('reRenderPost', pid)
  })

  socket.on('reloadComment', () => {
    io.emit('reRenderComment')
  })
});

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./routes/authenticate.route')(app)
require('./routes/user.route')(app)

const postRouter = require('./routes/post.route');
const notificationRouter = require('./routes/notification.route');
const imageRouter = require('./routes/image.route')


app.use('/api/post', postRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/image', imageRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(err.message);
});

// module.exports = app;