const User=require('../models/userSchema');
const bcrypt=require('bcrypt');


//get sign up page
module.exports.SingUp=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('sign-up',{
        title:"Sign Up"
    })
}
//get sign in page
module.exports.SingIn=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('sign-in',{
        title:"Sign In"
    })
}

//Registration
module.exports.register=async(req,res)=>{

    try {
        if(req.body.password !=req.body.confirm_password){
            return res.redirect('back');
        }
      
        let user=await User.findOne({email:req.body.email});
        if(!user){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(req.body.password,salt);
           user=await User.create({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword
            })
           
            return res.redirect('/users/sign-in');
        }else{
            console.log("User is already in database");
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
}


//sign in
module.exports.createSession=(req,res)=>{
console.log("signin");
req.flash('success','Logged in Successfully')
  return res.redirect('/');
}

//sign out
module.exports.signOut=(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have logged out!')
        res.redirect('/users/sign-in');
      });
}