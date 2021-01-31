
module.exports= function(passport,login) {
//   var passport = require('passport')
//   , LocalStrategy = require('passport-local').Strategy;
// var Login =require('../models/admin/login');
 
var Login = login;
  var LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


// used to deserialize the user
passport.deserializeUser(function(id, done) {
Login.findOne({ where : { id: id}}).then(function(user) {
if(user){
  done(null, user.get());
}
else{
  done(user.errors,null);
}
});

});
 
  passport.use('local', new LocalStrategy(
    
    {
  
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
  
     function(req, email, password, done)  {
     Login.findOne({ where : { email: email}}).then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Email does not exist' });
        }
  
        if (user.password != password) {
  
          return done(null, false, { message: 'Incorrect password.' });
  
        }
  
        var userinfo = user.get();
  
        return done(null,userinfo);
  
      }).catch(function(err){
  
        console.log("Error:",err);
  
        return done(null, false, { message: 'Something went wrong with your Signin' });
  
  
      });
  
    }
    ));
  
}
