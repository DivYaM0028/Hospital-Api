const Doctor = require('../models/doctor');

module.exports.doctor=function(req,res){
    return res.render('doctor',{
        title:"Doctor"
    });
}

module.exports.register = function(req,res){
    return res.render('doctor_register',{
        title:"Register"
    })
}

module.exports.login = function(req,res){
    return res.render('doctor_login',{
        title:"Login"
    })
}


// get the register data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Doctor.findOne({email: req.body.email}, function(err, doctor){
        if(err){console.log('error in finding user in signing up'); return}

        if (!doctor){
            Doctor.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/doctors/login');
            })
        }else{
            return res.redirect('back');
        }

    });
}

module.exports.createSession = function(req,res){

}

// login and create a session for the user
module.exports.createSession = function(req, res){

    // steps to authenticate
    // find the doctor
    Doctor.findOne({email: req.body.email}, function(err, doctor){
        if(err){console.log('error in finding doctor in signing in'); return}
        // handle user found
        if (doctor){

            // handle password which doesn't match
            if (doctor.password != req.body.password){
                return res.redirect('back');
            }

            return res.redirect('/doctors/doctor');

        }else{
            return res.redirect('back');
        }


    });
   
}