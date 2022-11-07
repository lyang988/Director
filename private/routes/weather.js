var request = require('request');
exports.weatherform= function(req, res){
    console.log('user has landed at the page');
    res.render('wform');
    // render the page
};

exports.getweather= function(req, res){
    // increment the number of visitors
    console.log('3');
    if(req.query.type=='no'){
    res.render('index',{forecasts:res.locals.final_object.properties.periods
    });
    }
    else{
        res.json({forecasts:res.locals.final_object.properties.periods
    });
    }
    
    // render the page
};
exports.doMiddlewareAsync=function(req,res,next){
    console.log('1');
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

exports.doMiddleware = function(req,res,next){
    console.log('2');
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