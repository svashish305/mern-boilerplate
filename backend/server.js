require('rootpath')();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

const socket={};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
app.use(cors(corsOptions));

io.on("connection", (socket) => {
    socket = socket;
    console.log("New client connected");
    socket.emit("FromAPI", "hello from socket!");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

app.use(function(req, res, next){
    res.io = io;
    next();
});

app.use('/api/users', require('./models/User/users.controller'));
app.use('/api/todos', require('./models/Todo/todos.controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
http.listen(port, () => {
    console.log('Server listening on port ' + port);
});

module.exports = {app: app, server: http}