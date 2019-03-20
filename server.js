//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter   = require('./apiRouter').router;
var cors = require('cors');
var port = process.env.PORT || 8081;


//Instantiate server
var server = express();

//Body Parser conf
server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json());


//Configures routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur lAPI Global SSI</h1>');
});
server.use(cors());


server.use('/apiGlobal/', apiRouter);

//Launch server
server.listen(port, function(){
    console.log('server listening');
});