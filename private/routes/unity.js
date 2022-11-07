var path = require('path');
exports.game= function(req, res){
    // increment the number of visitors
    res.sendFile(path.join(__dirname, '/index.html'));
    //res.send('hi');
    // render the page
};