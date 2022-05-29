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
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        let items = await dbProvider.AllOrders();

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

    app.get('/items', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        let items = await dbProvider.GetItems();

        res.render('items.ejs', {
            user: req.user,
            items: items
        });
    });

    app.get('/item/:id', isLoggedIn, async function(req, res) {
        let item = await dbProvider.GetItem(req.params.id);
        let reviews = await dbProvider.GetReviews(req.params.id);

        res.render('item.ejs', {
            user: req.user,
            item: item,
            reviews: reviews
        });
    });

    app.get('/setOrderStatus/:id/:newStatus', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }

        let currentStatus = await dbProvider.GetOrderStatus(req.params.id);
        currentStatus = currentStatus[0].orderStatus;

        if((currentStatus == 1 && req.params.newStatus == 4) ||
            (currentStatus == 2 && req.params.newStatus == 3) ||
            (currentStatus == 2 && req.params.newStatus == 1) ||
            currentStatus == 3 ||
            currentStatus == 4)
            res.redirect("/");

        await dbProvider.UpdateOrderStatus(req.params.id, req.params.newStatus);

        res.redirect("/allOrders");
    });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/login');
        });
    })

    app.get('/newReview/:itemId', isLoggedIn, async function(req, res) {
        let itemId = req.params.itemId;

        let text = req.query.text;
        let rating = parseInt(req.query.inlineRadioOptions);

        if(rating == null)
            res.redirect('/');

        await dbProvider.AddReview(req.user.id, itemId, rating, text);

        res.redirect('/item/' + itemId);
    });

    app.get('/newItem', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }
        
        let name = req.query.name;
        let price = parseInt(req.query.price);
        let url = req.query.url;

        if(name == null || price == null || url == null)
            res.redirect('/');
            
        await dbProvider.AddItem(name, price, url);

        res.redirect('/items');
    });

    app.get('/removeItem/:id', isLoggedIn, async function(req, res) {
        if(req.user.isAdmin == 0){
            res.redirect("/");
        }
        
        await dbProvider.RemoveItem(req.params.id);

        res.redirect('/items');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
