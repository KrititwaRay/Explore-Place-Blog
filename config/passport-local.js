const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/userSchema');
const bcrypt=require('bcrypt');


// // Authentication using passport
passport.use(new LocalStrategy({
            usernameField:'email' ,
            passReqToCallback:true
           },
           async function(req,email,password,done){
                    const user=await User.findOne({email:email});
            
                    if(!user){
                        req.flash('error','Invalid Username/Password');
                        console.log('Invalid Username/Password');
                        return done(null,false);
                    }
            
                    const isPasswordCorrect=await bcrypt.compare(password,user.password);
            
                    if(!isPasswordCorrect){
                        req.flash('error','Invalid Username/Password');
                        console.log('Invalid Username/Password');
                        return done(null, false);
                    }
                  
                    return done(null, user);
                }
))


passport.serializeUser(function(user, done) {
      
         done(null,user.id);
      });
      
passport.deserializeUser(async function(id, done) {
   let user=await User.findById(id);
           if(!user){
            return done(err);
           }
            return done(null,user)  ;
});


//check the user is authenticated or not
passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    
    }
   return next();
}





module.exports=passport;