let mysql = require('mysql');


module.exports = function(app, passport, dbProvider) {

    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }),
        function(req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/register', function(req, res) {
        res.render('register.ejs', {
            message: req.flash('registerMessage')
        });
    });

    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.get('/', isLoggedIn, async function(req, res) {
        let items = await dbProvider.GetItems();
        //console.log(items);
        //console.log(req);
        res.render('index.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/orders', isLoggedIn, async function(req, res) {
        let items = await dbProvider.GetOrders(req.user.id);
        //console.log(items);
        //console.log(req);
        res.render('orders.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/allOrders', isLoggedIn, async function(req, res) {
        let items = await dbProvider.AllOrders();
        
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        res.render('allOrders.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/order/:id', isLoggedIn, async function(req, res) {
        await dbProvider.AddOrder(req.params.id, req.user.id);
        
        res.render('orderCompleate.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/login');
        });
    })
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
