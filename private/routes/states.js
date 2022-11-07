var highscore=0;
exports.mapworker=function(req,res){
    console.log(req.query.score);
    if(req.query.score>highscore){
    highscore = req.query.score;
    }
    console.log(highscore);
    res.render('scoreresult',{hs:highscore});
}
exports.map= function(req, res){
    // increment the number of visitors
    res.render('map');
    
    // render the page
};
exports.instructions=function(req,res){
    res.render('mapinstructions');
}