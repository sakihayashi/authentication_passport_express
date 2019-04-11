var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/User');
var bycrypt = require('bcryptjs');

module.exports = function (passport){
    passport.serializeUser(function (user, done){
        console.log('serialzed 8: ', user);
        
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done){
        User.findById(id, function (err, user){
            done(err, user);
        })
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done){
        User.findOne({email: email}, function (err, user){
            if(err){
                return done(err, null);
            }
            if(!user){
                return done(null, false, req.flash('loginMessage', 'User does not exist! Go sign'));
            }
            bycrypt.compare(password, user.password)
                    .then((err, res) => {
                        if(err === false){
                            return done(null, false, req.flash('loginMessage', 'Check email or password'))
                        }else{
                            return done(null, user);
                        }
                    })
        })
    }))
}