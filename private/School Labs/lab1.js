#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var path = require('path')
var app = express();


// -------------- express initialization -------------- //
// PORT SETUP - NUMBER SPECIFIC TO THIS SYSTEM

app.set('port', process.env.PORT || 8080 );


// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', callIndex);

app.get('/foo', function(req, res){
    res.send('requested foo');
});
app.get('/dog.jpg', function(req, res){
    var fileName = 'cat.jpg';
    var fullPath = path.join(__dirname,fileName);
    console.log('user has landed at the page');
    res.sendFile(fullPath);
});
app.get('/cat.jpg', function(req, res){
    var fileName = 'cant_even.jpg';
    var fullPath = path.join(__dirname,fileName);
    console.log('user has landed at the page');
    res.sendFile(fullPath);
});
app.get('/fish.jpg', callIndex);
function callIndex(req,res){
    var fileName = 'index.html';
    var fullPath = path.join(__dirname,fileName);
    console.log('user has landed at the page');
    res.sendFile(fullPath);
}
app.get('/pet', function(req, res){
    var type = req.query.type;
    var fileName;
    var fullPath;
    if(type=='cat'){
         fileName = 'cat.jpg';
         fullPath = path.join(__dirname,fileName);
         res.sendFile(fullPath);
    }
    else if(type=='dog'){
        fileName = 'cant_even.jpg';
        fullPath = path.join(__dirname,fileName);
        res.sendFile(fullPath);
    }
    else{
        res.send('undefined');
    }
    
    console.log('user has landed at the page');
    
});
app.get('/not_a_search', function(req, res){
    var theQuery = req.query.q;
    res.send('query parameter:' + theQuery);
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});