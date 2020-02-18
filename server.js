// simple server

/*
const http = require('http');

const  port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.end("Hello world");
});

server.listen(port);
*/

// complex server

const http = require('http');

const app = require('./backend/app');
var path = require("path")

const debug = require('debug');
const express = require('express');

function nomarlizePort( value ) {
  let port = parseInt(value, 10);

  if (isNaN(port)) {
    return value
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = process.env.PORT || '8080';

function onError(err) {
  if (err.syscall !== "listen") {
      throw err;
  }

  const addr = server.address();
  const bind = typeof(addr) === 'string' ? 'pipe' + addr : "port" + port;

  switch(err.code){
    case 'EACCES':
      console.error(bind + "Nor ready");
      process.exit(1)
      break;
    case 'EADDRINUSE':
      console.error(bind + 'is ready');
      process.exit(1);
      break;
    default:
      throw err;
      break;
  }

}

function onListen() {
  const addr = server.address();
  const bind = typeof(addr) === 'string' ? 'pipe' + addr : 'port' + port;
  debug("Listening on" + bind);
}


app.enable('trust proxy');

app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

// Allow static files in the /public directory to be served
app.use(express.static(__dirname + '/public'));


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/projectThree'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/projectThree/index.html'));
});

app.set('port', port);
const server = http.createServer(app);


server.on('error', onError);
server.on('listening', onListen);
server.listen(port);
