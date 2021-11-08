const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router');

const server = express();

server.use(express.static(path.join(__dirname, '../client')));
server.use(helmet());
server.use(express.json());
server.use(session({
  name: 'monkey', //the name of the session id
  secret: 'make it long and random', //the session id is actually encrypted
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // in prod, it should be true (only over HTTPS)
    httpOnly: true, // (the javascript cannot read the cookie)
  },
  rolling: true, //push back the expiration date of cookie
  resave: false, // needed for some session storage solutions
  saveUninitialized: false // if false, sessions are not stored "by default"
}))

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
