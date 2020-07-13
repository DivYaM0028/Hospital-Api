const Doctor = require('../models/doctor');


module.exports.doctor = function(req, res){
    if (req.cookies.doctor_id){
        Doctor.findById(req.cookies.doctor_id, function(err, doctor){
            if (doctor){
                return res.render('doctor', {
                    title: "Doctor's Profile",
                    doctor: doctor
                })
            }else{
                return res.redirect('/doctors/login');

            }
        });
    }else{
        return res.redirect('/doctors/login');

    }


    
}


// render the sign up page
module.exports.register = function(req, res){
    return res.render('doctor_register', {
        title: "Register"
    })
}


// render the sign in page
module.exports.login = function(req, res){
    return res.render('doctor_login', {
        title: "Login"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Doctor.findOne({email: req.body.email}, function(err, doctor){
        if(err){console.log('error in finding user in signing up'); return}

        if (!doctor){
            Doctor.create(req.body, function(err, doctor){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/doctors/login');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){

    // steps to authenticate
    // find the user
    Doctor.findOne({email: req.body.email}, function(err, doctor){
        if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        if (doctor){

            // handle password which doesn't match
            if (doctor.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('doctor_id', doctor.id);
            return res.redirect('/doctors/doctor');

        }else{
            // handle user not found

            return res.redirect('back');
        }


    });

 

    

    
}