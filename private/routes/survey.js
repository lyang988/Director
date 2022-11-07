var votes={"cheese":0,"brown":0,"tapioca":0,"thai":0};
exports.voting_form=function(req,res){
    res.render('voting');
}
exports.voting_workers=function(req,res){
    console.log('votingworker');
    votes[req.query.the_number]+=1;
    res.render('pollresult',votes);
}