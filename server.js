const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const flash = require('express-flash');
const session   = require('express-session');
const initRoutes = require('./routes/web');
const sequelize = require('./app/models/connection');
const passport=require('passport');
const Login =require('./app/models/admin/login');
global.appRoot = path.resolve(__dirname);
require('dotenv').config(); 


let port=process.env.PORT || 3000;
let secretKey=process.env.KEY;
//express data middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log(port);
console.log(secretKey);

///check database is connect
sequelize.authenticate().then(() => console.log("Database is connected...")).catch((err) => console.log("Error: " + err));

//Assets
app.use(express.static('public'));

//passport config
app.use(session({ secret: secretKey,resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session());
// app.use(passport.initialize());

// //Session config
// app.use(sesstion({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: false,

//     cookie: { maxAge: 1000 * 60 * 60 * 24 } //valid for 24hours time 
//     //cookie: { maxAge: 1000 * 10 } //valid for 24hours time 
// }));

require('./app/config/passport_config')(passport,Login);

//express flash
app.use(flash());



//for photos upload
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


///set Template engine
app.use(expressLayout);

app.set('views', path.join(__dirname, '/resources/views'));
//app.set('views', []);
app.set('view engine', 'ejs');

initRoutes(app,passport);

app.listen(3000, () => {
    console.log("Server running at 3000");
});