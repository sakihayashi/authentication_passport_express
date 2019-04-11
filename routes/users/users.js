var express = require('express');
var router = express.Router();
var userController = require('../../controllers/userController');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res) {

  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  res.render('auth/signup', {errors: req.flash('errors')});
});

router.post('/signup', function (req, res){
  
  //set up controller for this signup
  userController.createUser(req.body)
    .then(user => {
      req.logIn(user, function (err){
        if (err) {
          res.status(400).json({
            confirmation: false,
            message: err
          })
        }else{
          res.redirect('/')
        }
      })
      // res.redirect('/')
    })
    .catch(error => {
      console.log('this is error', error)
      req.flash('errors', error.message);
      return res.redirect(301, '/api/users/signup')
    });
})

router.get('/signin', function (req, res){
  res.render('auth/signin', {errors: req.flash('loginMessage')})
})

router.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}))

router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
})

module.exports = router;
