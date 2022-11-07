console.log('ya');
var cookie = require('./cookie');
var weather = require('./weather');
var states = require('./states');
var funform = require('./funform');
var survey = require('./survey');
var oauth = require('./oauth');
var house = require('./houses');
var unity = require('./unity');
console.log(cookie);
console.log(cookie.cookie);
module.exports.set=function(app){
    //Cookie Lab
    app.get('/cookie', cookie.cookie);
    app.get('/login', cookie.login);
    app.get('/loginworker',cookie.loginworker);
    app.get('/cookiereset', cookie.cookiereset);
    //Weather Lab
     app.get('/weatherform', weather.weatherform);
     app.get('/getweather',[weather.doMiddlewareAsync,weather.doMiddleware], weather.getweather)
    //States Lab
     app.get('/map', states.map);
     app.get('/mapworker', states.mapworker);
     app.get('/instructions', states.instructions);
    //Survey Lab
     app.get('/voting_form', survey.voting_form);
     app.get('/voting_workers', survey.voting_workers);
    //Funform Lab
     app.get('/funform', funform.funform);
     app.get('/yay', funform.yay);
     //Oath Lab
     app.get('/', oauth.hi);
     app.get('/ionworker',oauth.ionworker);
     app.get('/logout', oauth.logout);
     //House Lab
     app.get('/addpoints', house.addpoints);
     app.get('/viewpoints', house.viewpoints);
     app.get('/houseworker', house.houseworker);
     app.get('/houseworker2', house.houseworker2);
     //Unity 
     app.get('/unity', unity.game);
    //default
    app.get('/:page', function(req, res){
        res.send('sorry, cannot get '+req.query.page+'Homepage: https://user.tjhsst.edu/2021lyang/' )
    });
}