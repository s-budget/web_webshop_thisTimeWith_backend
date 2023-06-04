
const productData=require('./data/data');

const express=require("express");
const cookieParser=require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app =express();
const PORT =3001;
const indexRouter=require('./routes/index.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: 'MiskoMiskoMisko',
    resave: false,
    saveUninitialized: false,
    cookie: {
 
        // Session expires after 1 min of inactivity.
        expires: 60000*10
    }
    
  })) ;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/",indexRouter);

app.listen(PORT,()=>
{
    console.log('server is at: '+PORT);
});