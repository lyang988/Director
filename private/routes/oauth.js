var simpleoauth2 = require("simple-oauth2");
var request = require('request');

var ion_client_id = "sHJ5EollRki204jnwMJBBDTsXmEO0Ab4FQIqcN7j";
var ion_client_secret = "9CrSmyk10aJ0TzXfwzI43jI82ODvc1Xs5REgF4UcRBWjEzZsv2GmzJwiCEALxCiW2cp69Q4n7I3bpnifJuiA3tIvAr2tWvMMASHSopZyjbomyfy1fkTMaxiaLB1RsG5C";
var ion_redirect_url = "https://user.tjhsst.edu/2021lyang/ionworker";

var oauth2 = simpleoauth2.create({
    client: {
        id: ion_client_id,
        secret: ion_client_secret,
    },
    auth: {
        tokenHost: 'https://ion.tjhsst.edu/oauth/',
        authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
        tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
    }
});
var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_url
});
exports.logout = function(req,res){
    req.session = null;
    res.send("you are logged out")
}
exports.hi= function(req, res){
    if (!('token' in req.session)) {
        // ...if the token does not exist, this means that the user has not logged in
    
        // if the user has not logged in, we'll send them to a page asking them to log in
        var output_string = "";
        output_string += "<!doctype html>\n";
        output_string += "<html><head></head><body>\n";
        output_string += "<a href="+authorizationUri+">"+authorizationUri+"</a>"
        output_string += "</body></html>";
        // send away the output+
        //res.send(output_string);
        res.render('ionlogin',{'link': authorizationUri});

    } else {
        // ... if the user HAS logged in, we'll send them to a creepy page that knows their name

        // Now, we create a personalized greeting page. Step 1 is to 
        // ask ION for your name, which means conducting a request in the
        // background before the user's page is even rendered.

        // To start the process of creating an authenticated request, 
        // I take out the string 'permission slip' from 
        // the token. This will be used to make an ION request with your
        // credentials
        
        var access_token = req.session.token.access_token;
        
        // Next, construct an ION api request that queries the profile using the 
        // individual who has logged in's credentials (it will return) their
        // profile
        var my_ion_request = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;

        // Perform the asyncrounous request ...
        request.get( {url:my_ion_request}, function (e, r, body) {
            // and here, at some later (indeterminite point) we land.
            // Note that this is occurring in the future, when ION has responded
            // with our profile.

            // The response from ION was a JSON string, so we have to turn it
            // back into a javascript object
            var res_object = JSON.parse(body);
        
            // from this javascript object, extract the user's name
            user_name = res_object['short_name'];

            // Construct a little page that shows their name
            var output_string = "";
            output_string += "<!doctype html>\n";
            output_string += "<html><head></head><body>\n";
            output_string += "<p>Hello "+user_name+"!</p>\n";
            output_string += "</body></html>";
            //req.session.login=true;
            // send away the output
            //res.send(res_object)
            
            req.session.username=user_name;
            res.render('homepage', res_object);
            //res.send(output_string);
        });
    }
};

exports.handleCode = handleCode;
    
async function handleCode(req, res, next) {    

        theCode = req.query.code;

    var options = {
        'code': theCode,
        'redirect_uri': ion_redirect_url,
        'scope': 'read'
     };
    
    // needed to be in try/catch
    try {
        var result = await oauth2.authorizationCode.getToken(options);      // await serializes asyncronous fcn call
        var token = oauth2.accessToken.create(result);
        res.locals.token = token;
        next()
    } 
    catch (error) {
        console.log('Access Token Error', error.message);
         res.send(502); // bad stuff, man
    }
    }
exports.ionworker = [handleCode, function(req,res){
    req.session.token = res.locals.token.token;
    req.session.login=true;
    res.redirect('https://user.tjhsst.edu/2021lyang');
}];