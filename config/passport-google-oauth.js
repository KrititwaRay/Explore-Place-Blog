const passport=require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require('../models/userSchema');
const crypto=require('crypto');
passport.use(new GoogleStrategy({
  

   clientID:"512836349111-m5necvtnd573nprtb2njidgsaavoe1c0.apps.googleusercontent.com",
   clientSecret:"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",
   callbackURL:"http://localhost:8000/users/auth/google/callback",
    
    
   
  },
  async function( accessToken, refreshToken, profile, done) {
      
   
      const user=await User.findOne({email:profile.emails[0].value});
      if(user){
         return done(null,user);
      }else{
         User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString('hex')
        })
        return done(null,user);
      }
    
  }
));

module.exports=passport;