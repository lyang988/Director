#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
var path = require('path');


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM
app.use(express.static(path.join(__dirname,'unitytwo')));
app.set('port', process.env.PORT || 8080 );


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/hi', function(req, res){
    res.sendFile(path.join(__dirname, 'TemplateData/webgl-logo.png'));
});




// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});