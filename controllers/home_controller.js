module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('doctor_id', 25);
    return res.render('home', {
        title: "Hospital"
    });
}

// module.exports.actionName = function(req, res){}