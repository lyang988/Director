#!/usr/bin/nodejs

// -------------- load packages -------------- //
var cookieSession = require('cookie-session')
var express = require('express')
var simpleoauth2 = require('simple-oauth2');
var app = express();
var request = require('request');

app.set('trust proxy', 1) // trust first proxy

// -------------- express initialization -------------- //

// Here, we set the port (these settings are specific to our site)
app.set('port', process.env.PORT || 8080 );

// This is included to while express is sitting behind a proxy
// app.set('trust proxy', 1) // trust first proxy 


// These are keys that we'll use to encrypt our cookie session.
// If you open the developer tools, you'll find taht we only have 
// one cookie (named session). All of the subparameters that we add
// within the cookie (like the OAUTH token, and the javascript variable 
// name we give the token) will be embedded through double encryption 
// usiung these keys
app.use(cookieSession({
  name: 'sdfdsa',
  keys: ['detKeygdsgss123', 'ThatYouShosdfgsfgfdsgtyuldChange456']
}))


// -------------- variable initialization -------------- //

// These are parameters provided by the authenticating server when
// we register our OAUTH client.
// -- The client ID is going to be public
// -- The client secret is super top secret. Don't make this visible
// -- The redirect uri should be some intermediary 'get' request that 
//     you write in whichyou assign the token to the session.

var ion_client_id = 'sHJ5EollRki204jnwMJBBDTsXmEO0Ab4FQIqcN7j';
var ion_client_secret = '9CrSmyk10aJ0TzXfwzI43jI82ODvc1Xs5REgF4UcRBWjEzZsv2GmzJwiCEALxCiW2cp69Q4n7I3bpnifJuiA3tIvAr2tWvMMASHSopZyjbomyfy1fkTMaxiaLB1RsG5C';
var ion_redirect_uri = 'https://user.tjhsst.edu/2021lyang/ionworker';    //    <<== you choose this one

// Here we create an oauth2 variable that we will use to manage out OAUTH operations

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

// This is the link that will be used later on for logging in. This URL takes
// you to the ION server and asks if you are willing to give read permission to ION.

var authorizationUri = oauth2.authorizationCode.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});


// -------------- express 'get' handlers -------------- //

app.get('/', function (req, res) {
    

    // Here we ask if the token key has been attached to the session...
    if (!('token' in req.session)) {
        // ...if the token does not exist, this means that the user has not logged in
    
        // if the user has not logged in, we'll send them to a page asking them to log in
        var output_string = "";
        output_string += "<!doctype html>\n";
        output_string += "<html><head></head><body>\n";
        output_string += "<a href="+authorizationUri+">"+authorizationUri+"</a>"
        output_string += "</body></html>";
        // send away the output
        res.send(output_string);


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

            // send away the output
            res.send(output_string);
        });
    }
});


// -------------- intermediary login_worker helper -------------- //


async function handleCode(req, res, next) {
    theCode = req.query.code;

    var options = {
        'code': theCode,
        'redirect_uri': ion_redirect_uri,
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

app.get('/ionworker', [handleCode], function(req, res) { 
    console.log(res.locals.token)
    req.session.token = res.locals.token.token;
    
    res.redirect('https://user.tjhsst.edu/2021lyang');
});

// -------------- express listener -------------- //

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
