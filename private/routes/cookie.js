
    

exports.cookie= function(req, res){
    console.log('hi cookies');
    // increment the number of visitors
    if( typeof(req.session.views)=='undefined' ) {            // if the cookie has not been set
      req.session.views = 1;                                //   set it to 1;
    } else {                                                  // otherwise, 
      req.session.views++;                                  //   increment its value
    }
    
    if(req.session.views<5 &&(req.session.login===false||typeof(req.session.login)=='undefined')){
        req.session.login=false;
        fileName = 'images/pineapplebun.jpg';
         res.render('cookietrial',{count:(req.session.views),
                                   left:(4-req.session.views),
                                   img:fileName
         })
    }
    else if(req.session.login===true){
        fileName = 'images/pineapplebun.jpg';
        res.render('loggedin',{count:(req.session.views),
                                username: (req.session.username),
                                   img:fileName
                                   });
    }
    else{
        res.render('outofviews');
    }
    // render the page
};
exports.login= function(req, res){
    console.log('hello login');
    res.render('login');
    // render the page
};
exports.loginworker=function(req,res){
    req.session.login=true;
    req.session.username =req.query.usn;
    req.session.views =0;
    res.send(req.session.username);
};
exports.cookiereset=function(req, res){
    // increment the number of visitors
      req.session=null;
      res.send("cookie reset");
    // render the page
};
