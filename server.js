//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter   = require('./apiRouter').router;
var cors = require('cors');


//Instantiate server
var server = express();

//Body Parser conf
server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json());


//Configures routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Hello world</h1>');
});
server.use(cors());


server.use('/api/', apiRouter);

//Launch server
server.listen(8080, function(){
    console.log('server listening');
});