let express = require('express');
let session = require('express-session');
let app = express();
let http = require('http').Server(app);

let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let dbconfig = require('./config/db');

let passport = require('passport');
let flash = require('connect-flash');
require('./passport')(passport);

app.set('views', __dirname + '/views');
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('public'));
require('./route')(app, passport);


const port = 3000;

app.get('/', function(req, res) {
    res.send("123");
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})