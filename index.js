const express=require('express'); 
const app=express();//
require('dotenv').config();
const mongoose=require('./config/mongoose');
const cookieParser = require('cookie-parser');

const expressLyouts=require('express-ejs-layouts');

const port=process.env.PORT || 3000;

const MongoStore=require('connect-mongo');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const passportGoogle=require('./config/passport-google-oauth');
const flash = require('connect-flash');
const customMiddleware=require('./config/middleware');



app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));
app.use(expressLyouts);



app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.use(session({
    name:"Explore Place",
    secret:"Session_Secret",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:"mongodb://127.0.0.1:27017/EXPLORE-PLACE-BLOG"
    })
}))



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/',require('./routes/places')); 
app.use('/users',require('./routes/user')); 


app.listen(port,()=>console.log(`Server is runing on port ${port}`));//