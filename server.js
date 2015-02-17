require('node-jsx').install({
    extension : '.jsx'
});

global.__BACKEND__     = process.env.BACKEND || '';
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.localStorage    = require('localStorage');
global.navigator       = require('navigator');

var Express      = require('express');
var Session      = require('express-session');
var CookieParser = require('cookie-parser');
var RedisStore   = require('connect-redis')(Session);
var Redis        = require('then-redis');
var Io           = require('socket.io');

var app    = require('./server/app');
var auth   = require('./server/auth');
var db     = require('./server/db');
var config = require('./application/config');

var dbClient, io, httpServer, server;

dbClient = Redis.createClient({
    host : 'localhost',
    port : 6379
});

server = new Express();

server.use(new CookieParser());
server.use(new Session({
    resave            : false,
    saveUninitialized : false,
    secret            : (process.env.SESSION_KEY || 'test key'),
    store             : new RedisStore({
        host : process.env.REDIS_HOST || 'localhost',
        port : process.env.REDIS_PORT || 6379,
        db   : process.env.REDIS_DB   || 2,
    })
}));

server.use(Express.static(process.cwd() + '/build'));
server.use(auth);
server.use(db);
server.use(app);

httpServer = server.listen(config.server.port);

io = new Io(httpServer);

io.on('connection', function (socket) {
    socket.emit('connected');

    dbClient.on('message', function (channel, message) {
        socket.emit(channel, {message : messsage});
    });

    dbClient.subscribe('instance');
});

console.log('Listening on ' + config.server.hostname + ':' + config.server.port);
