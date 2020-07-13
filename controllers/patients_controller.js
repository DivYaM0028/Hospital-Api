const Patient = require('../models/patient');

module.exports.patient=function(req,res){
    if (req.cookies.patient_id){
        Patient.findById(req.cookies.patient_id, function(err, patient){
            if (patient){
                return res.render('patient', {
                    title: "Patient's Profile",
                    patient: patient
                })
            }else{
                return res.redirect('/patients/login');

            }
        });
    }else{
        return res.redirect('/patients/login');

    }

}

// render the sign up page
module.exports.register = function(req, res){
    return res.render('patient_register', {
        title: "Register"
    })
}


// render the sign in page
module.exports.login = function(req, res){
    return res.render('patient_login', {
        title: "Login"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Patient.findOne({email: req.body.email}, function(err, patient){
        if(err){console.log('error in finding user in signing up'); return}

        if (!patient){
            Patient.create(req.body, function(err, patient){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/patients/login');
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
    Patient.findOne({contactnumber: req.body.contactnumber}, function(err, patient){
        if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        if (patient){

            // handle session creation
            res.cookie('patient_id', patient.id);
            return res.redirect('/patients/patient');

        }else{
            // handle user not found

            return res.redirect('back');
        }


    });

 

    

    
}
