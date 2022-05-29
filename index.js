const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbConfig = require('./config/db');
const passport = require('passport');
const flash = require('connect-flash');
const DbProvider = require('./providers/DbProvider')

let app = express();
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

let dbProvider = new DbProvider(dbConfig);

require('./routes/users')(app, passport, dbProvider);
require('./routes/items')(app, dbProvider);
require('./routes/orders')(app, dbProvider);
require('./passport')(passport, dbProvider);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})