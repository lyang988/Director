#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var app = express();
var hbs = require('hbs');


// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbs
app.set('view engine', 'hbs');


// -------------- variable definition -------------- //
var visitorCount = 0; 
var fact = '';

// -------------- express 'get' handlers -------------- //

app.get('/:page', function(req, res){
    // increment the number of visitors
    var info = req.params.page;
    var num = req.query.num_facts;
    var type = req.query.format;
    console.log(findfacts(info,num));
    if(type=='json'){
        if(!isNaN(info)){
            if(typeof(num)=='undefined'){
                if(info%2===0){
                    fact = info + ' is an even number'
                     res.json({facts:fact});
                }
                else{
                    fact = info + ' is an odd number'
                    res.json({facts:fact});
                }
            }
            else{
                fact = findfacts(info,num);
                res.json({facts:fact});
            }
        }
        else{
            fact = info + ' is not a number'
            res.json({facts:fact});
        }
    }
    else{
        if(!isNaN(info)){
            if(typeof(num)=='undefined'){
                if(info%2===0){
                    fact = info + ' is an even number'
                 res.render('index',{numfact:fact});
                }
                 else{
                     fact = info + ' is an odd number'
                    res.render('index',{numfact:fact});
                }
            }
            else{
                fact = findfacts(info,num);
                res.render('index',{numfact:fact});
            }
        }
        else{
            fact = info + ' is not a number'
            res.render('index',{numfact:fact});
        }
    }
   
    // render the page
});
 function findfacts(info, num){
    var s='';
    for(var i = 0; i<num;i++){
        console.log(i+info+num);
        var sum = Number.parseInt(info) + i;
        s+=(""+info + "+"+ i + " = " + sum +'\n');
        console.log(s);
    }
    return s;
    }

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});