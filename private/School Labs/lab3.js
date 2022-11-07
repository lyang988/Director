#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();
var hbs = require('hbs');
var fs = require('fs');
var path = require('path');
var request = require('request');
// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbs
app.set('view engine', 'hbs');


// -------------- variable definition -------------- //


// -------------- express 'get' handlers -------------- //

app.get('/getweather',[doMiddlewareAsync,doMiddleware], function(req, res){
    // increment the number of visitors
    res.render('index',{forecasts:res.locals.final_object.properties.periods
    });
    
    // render the page
});
function doMiddlewareAsync(req,res,next){
    var filename = 'https://api.weather.gov/points/'+req.query.lat+','+req.query.long;
    var params = {
         url : filename,
         headers : {
           'User-Agent': 'request'
        }
    }
    function callback(e, r, body) {
        
        var obj = JSON.parse(body);
        
        res.locals.some_object = obj;
        next();
    }
    request.get( params, callback );
}

function doMiddleware(req,res,next){
    console.log(res.locals.some_object.properties);
    if(typeof(res.locals.some_object.properties)== 'undefined'){
        res.send("out of bounds");
    }
    var filename = res.locals.some_object.properties.forecast;
    var params = {
         url : filename,
         headers : {
           'User-Agent': 'request'
        }
    }
    function callback(e, r, body) {

        var obj = JSON.parse(body);
        res.locals.final_object = obj;
        next();
    }
    request.get( params, callback );
}


// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});