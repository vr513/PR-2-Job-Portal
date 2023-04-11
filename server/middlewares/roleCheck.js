exports.adminCheck = async(req,res,next) => {
    if(req.user.role === 'admin'){
        next();
    }else{
        res.status(401).send({err : "Unauthorized request"});
    }
}

exports.verifiedEmployerCheck = async(req,res,next) => {
    if(req.user.role === 'employer'){
        if(req.user.verified === true){
            next();
        }else{
            res.status(403).send({err : "Account not yet verified"});
        }
    }else{
        res.status(401).send({err : "Unauthorized request"});
    }
}

exports.employerCheck = async(req,res,next) => {
    if(req.user.role === 'employer'){
        next();
    }else{
        res.status(401).send({err : "Unauthorized request"});
    }
}

exports.applicantCheck = async(req,res,next) => {
    if(req.user.role === "applicant"){
        next();
    }else{
        res.status(401).send({err : "Unauthorized request"});
    }
}