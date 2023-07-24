const router=require('express').Router();
const passport=require('passport');

const userController=require('../controller/userController');


router.get('/sign-up',userController.SingUp);//get sign up page
router.get('/sign-in',userController.SingIn);//get sign in page

router.post('/sign-up',userController.register);//register user

router.post('/sign-in',passport.authenticate('local',{failureRedirect: '/users/sign-up' }),userController.createSession);//sign in user

router.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:"/users/sign-in"}),userController.createSession);


router.get('/sign-out',userController.signOut);//sign out user

module.exports=router;