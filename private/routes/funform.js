
exports.funform=function(req, res){
    var teas = [
            {'k':'0', 'v' :'Select Tea:'},
            {'k':'oolong', 'v' :'Oolong Tea'},
            {'k':'matcha', 'v' :'Matcha'},
            {'k':'black', 'v' :'Black Tea'},
            {'k':'jasmine', 'v' :'Jasmine Tea'},
        ]
    res.render('funform',{tea:teas});
    // render the page
};
exports.yay= function(req, res){
    var t = req.query.tea;
    var s = req.query.size;
    var n = req.query.name;
    var top = req.query.topping;
    console.log(top);
    res.render('boba',{name : n, type:t,size:s,toppings:top});
    // render the page
};