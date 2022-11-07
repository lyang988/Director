var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  user            : 'site_2021lyang',
  password        : 'pzFKJJdbd9rc4Nb2qphxS6TW',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_2021lyang'
});
exports.addpoints = function(req,res){
    res.render('houses');
}
exports.viewpoints = function(req,res){
    res.render('points');
}
exports.houseworker = function(req,res){
    if (!('token' in req.session)){
        res.send("please log in");
    }
    else{
    if(typeof(req.query.caricature)!='undefined' && typeof(req.query.amount)!='undefined'){
            pool.query('insert into points(name, points) values (?, ?);',[req.query.caricature, req.query.amount], function (error, results2, fields) {
                
            });
            console.log("yes");
        }
    pool.query('select name,sum(points) as totalpoints from points group by name', function (error, results, fields) {
        if (error) throw error;
        var rst = results;
        
        console.log('---------');
        console.log('Raw sql results:', results);
        console.log('---------');
        console.log('number of sql results: ', results.length);
        console.log('---------');

        // tease some data out 
        var name = results[0].name;
        console.log(name);
        console.log(results);
        res.render('houseworker',{results:rst});
    //pool.end();
    });
    }
}
exports.houseworker2 = function(req,res){
    console.log(req.query)
    pool.query('select name, sum(points) as totalpoints from points where name = ?;', [req.query.who], function(error, results, fields){
        console.log(results);
        console.log(results[0])
        console.log(results[0].totalpoints);
        res.render('pointsworker',{points: results[0].totalpoints});
    })
}