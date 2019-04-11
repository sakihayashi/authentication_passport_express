var User = require('../models/User');
var bcrypt = require('bcryptjs');

// var express = require('express');

module.exports = {
    createUser: (params) =>{
        
        return new Promise((resolve, reject) => {
            console.log('this is from usercontroller: ', params);
            User.findOne({email: params.email})
                .then( duplicateEmail => {
                    if(duplicateEmail){
                    let error = {};
                    error.confirmation = false;
                    error.message = 'the email is already taken';
                    reject(error);
                    
                    }else{
                    let newUser = new User();
                        newUser.profile.name = params.name;
                        newUser.password = params.password;
                        newUser.email = params.email;
                    bcrypt.genSalt(10, function (err, salt){
                        bcrypt.hash(newUser.password, salt, (err, hash) =>{
                            if(err){
                                reject(err);
                            }else{
                                newUser.password = hash;
                            }
                            newUser.save()
                            .then(user => resolve(user))
                            .catch(err => reject(err));
                        })
                    }
                    )}
        })
        .catch(err => {
            let error = {};
                    error.confirmation = false;
                    error.message = 'the email is already taken';
                    reject(error);
        })
    })
}
}