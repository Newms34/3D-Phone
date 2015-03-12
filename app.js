var express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();
var routes = require('./routes');
var config = require('./.config');

app.set('views', path.join(__dirname, 'views'));

//use stuff
app.use(logger('dev'));
app.use(bodyParser.json()); //not sure if we'll explicityl need this, but... meh
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/',function(req,res,next){
    res.sendFile(__dirname+ '/views/index.html');
});

app.get('/mobile', function(req,res,next){
    res.sendFile(__dirname+ '/views/mobile.html');
});

app.get('/desktop', function(req,res,next){
    res.sendFile(__dirname+ '/views/desktop.html');
});

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {

    socket.on('controlMove', function(pitch) {
        //Do stuff!
        var moveDataToShip;
        io.emit('moveShip', moveDataToShip); //move the ship 
    });

});


 http.listen(3000, config.ip );



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {}
    });
});

